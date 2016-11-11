import querystring from 'querystring';
import axios from 'axios';
import { SubmissionError } from 'redux-form';

import { globalError } from './CommonActions';
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
        payload: true,
        globalError: true,
        error: error
    }
}

export function carList({ number: page, size, sort }, filter) {
    const ERROR = 'Не удалось загрузить список автомобилей. Повторите запрос позже';

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

                    return dispatch(carCacheLoad(false));
                } else {
                    dispatch(carListFailure(ERROR));
                    return Promise.reject(status);
                }
            }, error => {
                dispatch(carListFailure(ERROR));
                return Promise.reject(error.response.status);
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

function deleteCarFailure(error) {
    return {
        type: actionTypes.CAR_LIST_DELETE_FAILURE,
        payload: true,
        globalError: true,
        error: error
    }
}

export function deleteCar(pageable = {}, filter, car) {
    const ERROR = 'Ошибка при удалении автомобиля';

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

                    return dispatch(carList(pageable, filter))
                } else {
                    dispatch(deleteCarFailure(ERROR));
                    return Promise.reject(status);
                }
            }, error => {
                dispatch(deleteCarFailure(ERROR));
                return Promise.reject(error.response.status);
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
    const ERROR = 'Ошибка при регистрации. Попробуйте позже';

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
                    dispatch(globalError(ERROR));
                    return Promise.reject()
                }
            }, error => {
                dispatch(checkCarAccept());
                dispatch(globalError(ERROR));
                return Promise.reject(error.response.status);
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

function saveCarFailure(error) {
    return {
        type: actionTypes.CAR_CHANGE_SAVE_FAILURE,
        payload: true,
        globalError: true,
        error: error
    }
}

export function saveCar(action, data) {
    const ERROR = 'Не удалось сохранить автомобиль. Повторите запрос позже';

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
                dispatch(saveCarFailure(ERROR));
                return Promise.reject(status);
            }
        }, error => {
            const { status, data } = error.response;

            if (status === 500) {
                dispatch(saveCarFailure());
                throw new SubmissionError({
                    _error : data.message
                });
            } else {
                dispatch(saveCarFailure(ERROR));
                return Promise.reject(status);
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
    const ERROR = 'Ошибка при загрузке данных. Попробуйте позже';

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
                        dispatch(globalError(ERROR));
                        return Promise.reject();
                    }
                }), error => {
                    dispatch(globalError(ERROR));
                    return Promise.reject(error);
                })
        } else {
            return new Promise(resolve => {
                dispatch(carCacheLoadSuccess({
                    brands: oldCache.brands,
                    fuelTypes: oldCache.fuelTypes
                }));
                return resolve();
            })
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
        payload: true,
        globalError: true,
        error: error
    }
}

export function brandList({ number: page, size, sort }, filter) {
    const ERROR = 'Ошибка при загрузке данных. Повторите запрос позже';

    return (dispatch, getState) => {
        const selectedBrand = getState().carBrand.selectedBrand;

        dispatch(brandListRequest());

        const requestData = { page, size };

        if (sort) {
            requestData.sort = sort.field + ',' + (sort.isAscending ? 'asc': 'desc');
        }

        if (filter) {
            for (let property in filter) {
                if (filter.hasOwnProperty(property)) {
                    requestData[property] = filter[property];
                }
            }
        }

        return CallApi.get('/api/carBrands/search/findAllByBrandNameContainingIgnoreCase?'
            + window.decodeURIComponent(querystring.stringify(requestData)))
            .then(response => {
                const status = response.status;

                if (status === 200) {
                    const data = response.data._embedded
                        && response.data._embedded.carBrands;

                    dispatch(brandListSuccess(data));

                    if (selectedBrand) {
                        dispatch(enableBrandActions());
                    }
                    return Promise.resolve(data);
                } else {
                    dispatch(brandListFailure(ERROR));
                    return Promise.reject(status);
                }
            }, error => {
                dispatch(brandListFailure(ERROR));
                return Promise.reject(error.response.status);
            })
    }
}

export function resetBrandList() {
    return {
        type: actionTypes.CAR_BRAND_LIST_RESET
    }
}

export function enableBrandActions(selectedBrand = null, actionsEnabled = []) {
    return {
        type: actionTypes.CAR_BRAND_ENABLE_ACTIONS,
        payload: {
            selectedBrand,
            actionsEnabled
        }
    }
}

export function deleteBrandShow() {
    return {
        type: actionTypes.CAR_BRAND_DELETE_SHOW
    }
}

export function deleteBrandClose() {
    return {
        type: actionTypes.CAR_BRAND_DELETE_CLOSE
    }
}

function deleteBrandRequest() {
    return {
        type: actionTypes.CAR_BRAND_DELETE_REQUEST
    }
}

function deleteBrandSuccess() {
    return {
        type: actionTypes.CAR_BRAND_DELETE_SUCCESS
    }
}

function deleteBrandFailure(error) {
    return {
        type: actionTypes.CAR_BRAND_DELETE_FAILURE,
        payload: true,
        globalError: true,
        error: error
    }
}

export function deleteBrand(pageable = {}, filter, brand) {
    const ERROR = 'Ошибка при удалении марки автомобиля';

    return (dispatch) => {
        dispatch(deleteBrandRequest());

        return CallApi.remove(`/api/carBrands/${brand.id}`)
            .then(response => {
                const status = response.status;

                if (status === 204) {
                    dispatch(deleteBrandSuccess());

                    if (pageable.totalElements % pageable.size === 1) {
                        pageable.number = Math.max(0, pageable.number - 1);
                    }

                    return dispatch(brandList(pageable, filter))
                } else {
                    dispatch(deleteBrandFailure(ERROR));
                    return Promise.reject(status);
                }
            }, error => {
                dispatch(deleteBrandFailure(ERROR));
                return Promise.reject(error.response.status);
            })
    }
}

function saveBrandRequest() {
    return {
        type: actionTypes.CAR_BRAND_SAVE_REQUEST
    }
}

function saveBrandSuccess() {
    return {
        type: actionTypes.CAR_BRAND_SAVE_SUCCESS
    }
}

function saveBrandFailure(error) {
    return {
        type: actionTypes.CAR_BRAND_SAVE_FAILURE,
        payload: true,
        globalError: true,
        error: error
    }
}

export function saveBrand(action, brand) {
    const ERROR = 'Не удалось сохранить марку автомобиля';

    return (dispatch, getState) => {
        dispatch(saveBrandRequest());

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const { pageable, selectedBrand, brands } = getState().carBrand;

        const requestData = {
            brandName: brand.brandName
        };

        if (action === 'change') {
            requestData.id = selectedBrand.id;
            requestData.brandName = brands.find(b => b.id === selectedBrand.id)
                .brandName;
        }

        const call = (action ==='add')
            ? CallApi.post('/api/carBrands', JSON.stringify(requestData), config)
            : CallApi.patch(`/api/carBrands/${requestData.id}`, JSON.stringify(requestData), config);

        const successStatus = (action === 'add') ? 201 : 200;

        return call.then(response => {
            const status = response.status;

            if (status === successStatus) {
                dispatch(saveBrandSuccess());
                return dispatch(carCacheLoad(true));
            } else {
                dispatch(saveBrandFailure(ERROR));
                return Promise.reject(status);
            }
        }, error => {
            const { status } = error.response;

            if (status === 500) {
                dispatch(saveBrandFailure());
                return Promise.reject({
                    error: 'Такая марка уже существует'
                });
            } else {
                dispatch(saveBrandFailure(ERROR));
                return Promise.reject(status);
            }
        }).then(ignored => {
            dispatch(brandList(pageable, { brandName: '' }));
        })
    }
}

export function updateBrandRow(index, { brandName }) {
    return (dispatch, getState) => {
        if (brandName && brandName.length < 50
            && brandName.match(/^[а-яА-ЯЁёa-zA-Z\d\s]+$/)) {

            const { brands, selectedBrand } = getState().carBrand;

            const oldValue = brands[index];

            if (oldValue.brandName !== brandName) {
                const newValue = { ...oldValue };

                if (newValue.touched) {
                    if (newValue.updated.brandName === brandName) {
                        delete newValue.touched;
                        delete newValue.updated;
                        dispatch(enableBrandActions(selectedBrand, ['delete']));
                    }

                    newValue.brandName = brandName;
                } else {
                    newValue.touched = true;
                    newValue.updated = {
                        brandName: newValue.brandName
                    };
                    newValue.brandName = brandName;
                    dispatch(enableBrandActions(selectedBrand, ['change', 'delete']));
                }

                const newBrands = brands.slice(0, index);
                newBrands.push(newValue);
                dispatch({
                    type: actionTypes.CAR_BRAND_CHANGE_ROW,
                    payload: newBrands.concat(brands.slice(index + 1))
                });
            }
        }
    }
}