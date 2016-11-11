import { createAction } from 'redux-actions';
import { createSelector } from 'reselect';

import { CallApi } from '../../util/APIUtil';

import { carsListFetch } from './CarsListFetchActions';
import * as actionTypes from '../../constants/CarsActionTypes';


const DELETE_ERROR_MESSAGE = 'Произошла ошибка при удалении автомобиля. ' +
    'Повторите запрос позже';

const carsListDeleteUserRequest = createAction(actionTypes.CARS_LIST_DELETE_REQUEST);
const carsListDeleteUserSuccess = createAction(actionTypes.CARS_LIST_DELETE_SUCCESS);
const carsListDeleteUserFailure = createAction(actionTypes.CARS_LIST_DELETE_FAILURE,
    errorMessage => ({
        error: errorMessage,
        globalError: !!errorMessage
    }));

const getCars = (state) => state.cars.list.data.cars;
const getSelectedIndex = (state) => state.cars.list.data.selectedIndex;

const getSelectedCar = createSelector(getCars, getSelectedIndex,
    (cars, selectedIndex) => {
        if (selectedIndex === -1) {
            return null;
        } else {
            return cars[selectedIndex];
        }
    });

export const carsListDeleteUser = () => (dispatch, getState) => {
    const car = getSelectedCar(getState());

    if (!car) {
        return new Promise(resolve => resolve());
    }

    dispatch(carsListDeleteUserRequest());

    return CallApi.remove(`/api/cars/${car.id}`).then(response => {
        if (response.status === 204) {
            dispatch(carsListDeleteUserSuccess());

            const { data: { cars }, pageable } = getState().cars.list;

            if (cars.length === 1) {
                const newPageable = { ...pageable };
                newPageable.number = Math.max(0, newPageable.number - 1);
                return dispatch(carsListFetch(newPageable))
            }

            return dispatch(carsListFetch())
        } else {
            dispatch(carsListDeleteUserFailure(DELETE_ERROR_MESSAGE));
            return Promise.reject(response);
        }
    }, error => {
        dispatch(carsListDeleteUserFailure(DELETE_ERROR_MESSAGE));
        return Promise.reject(error.response);
    }).then(() => {
        dispatch(carsListModalClose())
    }, () => {
        dispatch(carsListModalClose())
    })
};

export const carsListModalShow = createAction(actionTypes.CARS_LIST_MODAL_SHOW);
export const carsListModalClose = createAction(actionTypes.CARS_LIST_MODAL_CLOSE);