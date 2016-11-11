import { createAction } from 'redux-actions';
import Qs from 'querystring';
import { SubmissionError } from 'redux-form';

import { CallApi } from '../../util/APIUtil';

import { changeTab } from '../ProfileActions';

import * as actionTypes from '../../constants/CarsActionTypes';


const DEFAULT_CAR = {
    brand: '',
    name: '',
    fuelType: '',
    maxVelocity: 50,
    fuelConsumption: 5.0
};

const CHECK_ERROR_MESSAGE = 'Во время проверки данных произошла ошибка. ' +
    'Попробуйте позже';
const SAVE_ERROR_MESSAGE = 'Во время сохранения произошла ошибка. ' +
    'Попробуйте позже';

const carsFormInit = createAction(actionTypes.CARS_FORM_INIT);
const carsFormDestroy = createAction(actionTypes.CARS_FORM_DESTROY);

export const carsFormOpen = (action) => (dispatch, getState) => {
    const { pageable, filter, sort, data } = getState().cars.list;

    const car = (action === 'add') ? { ...DEFAULT_CAR } : data.cars[data.selectedIndex];

    if (!car.brand) {
        car.brand = car.brandName;
    }

    if (!car.fuelType) {
        car.fuelType = car.fuelTypeName;
    }

    dispatch(carsFormInit({
        action,
        pageable,
        filter,
        sort,
        car
    }));

    dispatch(changeTab('carsForm'));
};

export const carsFormClose = () => (dispatch, getState) => {
    const { transitState } = getState().cars.form;

    dispatch(carsFormDestroy({
        ...transitState
    }));

    dispatch(changeTab('carsDB'));
};


const carsFormCheckRequest = createAction(actionTypes.CARS_FORM_CHECK_REQUEST);
const carsFormCheckSuccess = createAction(actionTypes.CARS_FORM_CHECK_SUCCESS);
const carsFormCheckFailure = createAction(actionTypes.CARS_FORM_CHECK_FAILURE,
    errorMessage => ({
        error: errorMessage,
        globalError: !!errorMessage
    }));

export const carsFormCheck = (car, action) => dispatch => {
    dispatch(carsFormCheckRequest());

    if (action === 'update') {
        return new Promise(resolve => {
            dispatch(carsFormCheckSuccess());
            return resolve()
        });
    }

    return CallApi.get('/api/cars/search/filter?' + Qs.stringify(car))
        .then(response => {
            if (response.status === 200) {
                const { data } = response;
                const cars = data['_embedded'] && data['_embedded'].cars;

                dispatch(carsFormCheckSuccess());
                if (cars) {
                    const foundCar = cars.find(c => c.name === car.name);

                    if (foundCar) {
                        const error = 'Такое сочетание уже существует';
                        return Promise.reject({
                            brand: [error],
                            name: [error],
                            fuelType: [error]
                        })
                    }
                }

                return Promise.resolve();
            } else {
                dispatch(carsFormCheckFailure(CHECK_ERROR_MESSAGE));
                return Promise.reject(response)
            }
        }, error => {
            dispatch(carsFormCheckFailure(CHECK_ERROR_MESSAGE));
            return Promise.reject(error.response)
        })
};


const carsFormSaveRequest = createAction(actionTypes.CARS_FORM_SAVE_REQUEST);
const carsFormSaveSuccess = createAction(actionTypes.CARS_FORM_SAVE_SUCCESS);
const carsFormSaveFailure = createAction(actionTypes.CARS_FORM_SAVE_FAILURE,
    errorMessage => ({
        error: errorMessage,
        globalError: !!errorMessage
    }));

export const carsFormSave = (car, action) => (dispatch, getState) => {
    dispatch(carsFormSaveRequest());

    const cache = getState().cars.cache;

    const requestData = {
        fuelConsumption: car.fuelConsumption,
        maxVelocity: car.maxVelocity
    };

    if (action === 'add') {
        requestData.name = car.name;
        requestData.brand = cache.brands
            .find(b => b.brandName === car.brand)['_links'].self.href;
        requestData.fuelType = cache.fuelTypes
            .find(f => f.fuelTypeName === car.fuelType)['_links'].self.href;
    }

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const call = (action ==='add')
        ? CallApi.post('/api/cars', JSON.stringify(requestData), config)
        : CallApi.patch(`/api/cars/${car.id}`, JSON.stringify(requestData), config);

    const successStatus = (action === 'add') ? 201 : 200;

    return call.then(response => {
        if (response.status === successStatus) {
            dispatch(carsFormSaveSuccess());
            return dispatch(carsFormClose())
        } else {
            dispatch(carsFormSaveFailure(SAVE_ERROR_MESSAGE));
            return Promise.reject(response);
        }
    }, error => {
        const response = error.response;

        if (response.status === 500) {
            dispatch(carsFormSaveFailure());
            throw new SubmissionError({
                _error : response.data.message
            });
        } else {
            dispatch(carsFormSaveFailure(SAVE_ERROR_MESSAGE));
            return Promise.reject(response);
        }
    })
};



