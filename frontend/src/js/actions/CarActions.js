import querystring from 'querystring';
import axios from 'axios';
import { SubmissionError } from 'redux-form';

import * as actionTypes from '../constants/CarActionTypes';
import { CallApi } from '../util/APIUtil';
import { changeTab } from './ProfileActions';

function carListRequest() {
    return {
        type: actionTypes.CAR_LIST_REQUEST
    }
}

function carListSuccess(carsInfo) {
    return {
        type: actionTypes.CAR_LIST_SUCCESS,
        payload: carsInfo
    }
}

function carListFailure(error) {
    return {
        type: actionTypes.CAR_LIST_FAILURE,
        payload: error
    }
}

export function carList({ number: page, size, sort }, filter) {
    return (dispatch) => {
        dispatch(carListRequest());

        const requestData = { page, size };

        if (sort) {
            requestData.sort = sort.field + ',' + (sort.isAscending ? 'asc' : 'desc');
        }

        if (filter) {
            for (let property in filter) {
                if (filter.hasOwnProperty(property) && filter[property]) {
                    requestData[property] = filter[property];
                }
            }
        }

        return CallApi.get('/api/cars/search/filter?'
            + window.decodeURIComponent(querystring.stringify(requestData)))
            .then(response => {
                const status = response.status;

                if (status === 200) {
                    const data = response.data._embedded ?
                        response.data._embedded.cars : [];

                    dispatch(carListSuccess({
                        data,
                        pageable: {
                            ...response.data.page,
                            sort
                        },
                        filter
                    }));

                    return Promise.resolve(data);
                } else {
                    console.log(status);
                    return Promise.reject();
                }
            }, error => {
                dispatch(carListFailure(error));
                alert('Ошибка на сервере. Повторите запрос позже');
                return Promise.reject(error);
            });
    }
}

export function resetFilters() {
    return {
        type: actionTypes.CAR_LIST_FILTERS_RESET
    }
}

export function resetList() {
    return {
        type: actionTypes.CAR_LIST_RESET
    }
}

export function enableActions(selectedCar = null, actions = []) {
    return {
        type: actionTypes.CAR_LIST_ENABLE_ACTIONS,
        payload: {
            selectedCar,
            actions
        }
    }
}

export function deleteModalShow() {
    return {
        type: actionTypes.CAR_LIST_DELETE_SHOW
    }
}

export function deleteModalClose() {
    return {
        type: actionTypes.CAR_LIST_DELETE_CLOSE
    }
}

function deleteCarRequest() {
    return {
        type: actionTypes.CAR_LIST_DELETE_REQUEST
    }
}

function deleteCarSuccess() {
    return {
        type: actionTypes.CAR_LIST_DELETE_SUCCESS
    }
}

function deleteCarFailure() {
    return {
        type: actionTypes.CAR_LIST_DELETE_FAILURE
    }
}

export function deleteCar(pageable = {}, car) {
    return (dispatch) => {
        dispatch(deleteCarRequest());

        return CallApi.remove(`/api/cars/${car.id}`)
            .then(response => {
                const status = response.status;

                if (status === 204) {
                    dispatch(deleteCarSuccess());

                    if (pageable.totalElements % pageable.size === 1) {
                        pageable.number = Math.max(0, pageable.number - 1);
                    }

                    return dispatch(carList(pageable))
                } else {
                    console.log(response);
                    return Promise.reject(status);
                }
            }, error => {
                alert('Непредвиденная ошибка. Повторите запрос позже');
                dispatch(deleteCarFailure(error.response.data.message));
                return Promise.reject(error);
            })
    }
}

function initCarChange(state) {
    return {
        type: actionTypes.CAR_CHANGE_TRANSITION,
        payload: state
    }
}

function leaveCarChange(state) {
    return {
        type: actionTypes.CAR_CHANGE_CLOSE,
        payload: state
    }
}

export function openCarChange(action) {
    return (dispatch, getState) => {
        const car = getState().car;

        dispatch(initCarChange({
            action,
            car: (action === 'add') ? null : car.selectedCar,
            pageable: car.pageable,
            filter: car.filter
        }));

        dispatch(changeTab('carChange'))
    }
}

export function closeCarChange() {
    return (dispatch, getState) => {
        const state = getState().carChange;

        dispatch(leaveCarChange({
            ...state.transitState
        }));

        dispatch(changeTab('carsDB'));
    }
}

function checkCarRequest() {
    return {
        type: actionTypes.CAR_CHANGE_CHECK_REQUEST
    }
}

function checkCarAccept() {
    return {
        type: actionTypes.CAR_CHANGE_CHECK_ACCEPT
    }
}

export function checkCarExists(car, action) {
    return (dispatch) => {
        dispatch(checkCarRequest());

        if (action === 'update') {
            return new Promise(resolve => {
                dispatch(checkCarAccept());
                return resolve()
            });
        }

        return CallApi.get('/api/cars/search/filter?' + querystring.stringify(car))
            .then(response => {
                dispatch(checkCarAccept());

                const status = response.status;

                if (status === 200) {
                    let data = response.data._embedded
                        && response.data._embedded.cars;

                    if (data) {
                        data = data.filter(d => d.name === car.name);

                        if (data.length > 0) {
                            const error = 'Такое сочетание уже существует';
                            return Promise.reject({
                                brand: [error],
                                name: [error],
                                fuelType: [error]
                            })
                        }
                    }

                    return Promise.resolve()
                } else {
                    return Promise.reject()
                }
            }, error => {
                const status = error.response.status;
                console.log(status);
                dispatch(checkCarAccept());
                return Promise.reject(status);
            })
    }
}

function saveCarRequest() {
    return {
        type: actionTypes.CAR_CHANGE_SAVE_REQUEST
    }
}

function saveCarSuccess() {
    return {
        type: actionTypes.CAR_CHANGE_SAVE_SUCCESS
    }
}

function saveCarFailure() {
    return {
        type: actionTypes.CAR_CHANGE_SAVE_FAILURE
    }
}

export function saveCar(action, data) {
    return (dispatch, getState) => {
        dispatch(saveCarRequest());

        const cache = getState().carCache;

        const requestData = {
            fuelConsumption: data.fuelConsumption,
            maxVelocity: data.maxVelocity
        };

        if (action === 'add') {
            requestData.name = data.name;
            requestData.brand = cache.brands
                .find(b => b.brandName === data.brand)._links.self.href;
            requestData.fuelType = cache.fuelTypes
                .find(f => f.fuelTypeName === data.fuelType)._links.self.href;
        }

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        console.log(requestData);

        const call = (action ==='add')
            ? CallApi.post('/api/cars', JSON.stringify(requestData), config)
            : CallApi.patch(`/api/cars/${data.id}`, JSON.stringify(requestData), config);

        const successStatus = (action === 'add') ? 201 : 200;

        return call.then(response => {
            const status = response.status;

            if (status === successStatus) {
                dispatch(saveCarSuccess());
                return dispatch(closeCarChange())
            } else {
                console.log(status);
                return Promise.reject(status);
            }
        }, error => {
            const { status, data } = error.response;

            dispatch(saveCarFailure());
            if (status === 500) {
                if (status === 500) {
                    throw new SubmissionError({
                        _error : data.message
                    });
                } else {
                    alert('Непредвиденная ошибка на сервере. Повторите запрос позже');
                    return Promise.reject(data);
                }
            }
        })
    }
}

function carCacheLoadRequest() {
    return {
        type: actionTypes.CAR_CACHE_LOAD_REQUEST
    }
}

function carCacheLoadSuccess(cache) {
    return {
        type: actionTypes.CAR_CACHE_LOAD_SUCCESS,
        payload: cache
    }
}

export function carCacheLoad(forced) {
    return (dispatch, getState) => {
        dispatch(carCacheLoadRequest());

        const oldCache = getState().carCache;

        if (!oldCache.brands || !oldCache.fuelTypes || forced) {
            return axios.all([CallApi.get('/api/carBrands'),
                CallApi.get('/api/fuelTypes')])
                .then(axios.spread((res1, res2) => {
                    const status1 = res1.status;
                    const status2 = res2.status;

                    if (status1 === 200 && status2 === 200) {
                        const brands = res1.data._embedded
                            && res1.data._embedded.carBrands;
                        const fuelTypes = res2.data._embedded
                            && res2.data._embedded.fuelTypes;

                        dispatch(carCacheLoadSuccess({ brands, fuelTypes }));

                        return Promise.resolve();
                    } else {
                        console.log(status1, status2);
                        return Promise.reject();
                    }
                }))
        }
    }
}

function brandListRequest() {
    return {
        type: actionTypes.CAR_BRAND_LIST_REQUEST
    }
}

function brandListSuccess(brands) {
    return {
        type: actionTypes.CAR_BRAND_LIST_SUCCESS,
        payload: brands
    }
}

function brandListFailure(error) {
    return {
        type: actionTypes.CAR_BRAND_LIST_FAILURE,
        payload: error
    }
}

export function brandList({ number: page, size, sort }, filter) {
    return (dispatch) => {
        dispatch(brandListRequest());

        const requestData = { page, size };

        if (sort) {
            requestData.sort = sort.field + ',' + (sort.isAscending ? 'asc': 'desc');
        }

        if (filter) {
            for (let property in filter) {
                if (filter.hasOwnProperty(property) && filter[property]) {
                    requestData[property] = filter[property];
                }
            }
        }

        return CallApi.get('/api/carBrands/search/findAllByBrandNameLike?'
            + window.decodeURIComponent(querystring.stringify(requestData)))
            .then(response => {
                const status = response.status;

                if (status === 200) {
                    const data = response.data._embedded
                        && response.data._embedded.carBrands;

                    dispatch(brandListSuccess(data));

                    return Promise.resolve(data);
                } else {
                    console.log(status);
                    return Promise.reject(status);
                }
            }, error => {
                console.log(error);
                dispatch(brandListFailure(error));
                return Promise.reject(error);
            })
    }
}