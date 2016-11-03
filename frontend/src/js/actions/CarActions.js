import querystring from 'querystring';

import * as actionTypes from '../constants/CarActionTypes';
import { CallApi } from '../util/APIUtil';

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

        console.log('action', page, size, sort, filter);
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

        console.log('request', requestData);

        return CallApi.get('api/cars/search/filter?'
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

        return CallApi.remove(`api/cars/${car}`)
            .then(response => {

            })
    }
}