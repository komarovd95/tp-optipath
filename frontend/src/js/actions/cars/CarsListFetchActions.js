import { createAction } from 'redux-actions';

import { CallApi } from '../../util/APIUtil';

import * as actionTypes from '../../constants/CarsActionTypes';


const FETCH_ERROR_MESSAGE = 'Произошла ошибка при загрузке данных. ' +
    'Повторите запрос позже';

const carsListRequest = createAction(actionTypes.CARS_LIST_FETCH_REQUEST);
const carsListSuccess = createAction(actionTypes.CARS_LIST_FETCH_SUCCESS);
const carsListFailure = createAction(actionTypes.CARS_LIST_FETCH_FAILURE,
    errorMessage => ({
        error: errorMessage,
        globalError: !!errorMessage
    }));

export const carsListFetch = (pageable, sort, filter) => (dispatch, getState) => {
    const { pageable: p, sort: s, filter: f } = getState().cars.list;

    dispatch(carsListRequest({
        pageable: pageable || p,
        sort: sort || s,
        filter: filter || f
    }));

    return CallApi.fetchList('/api/cars/search/filter', pageable || p, sort || s, filter || f)
        .then(response => {
            if (response.status === 200) {
                const { data } = response;
                const cars = data['_embedded'] ? data['_embedded'].cars : [];

                dispatch(carsListSuccess({
                    data: cars,
                    pageable: data.page
                }));

                return Promise.resolve(cars);
            } else {
                dispatch(carsListFailure(FETCH_ERROR_MESSAGE));
                return Promise.reject(response);
            }
        }, error => {
            dispatch(carsListFailure(FETCH_ERROR_MESSAGE));
            return Promise.reject(error.response);
        })
};

export const carsListReset = createAction(actionTypes.CARS_LIST_RESET);
export const carsListRowSelect = createAction(actionTypes.CARS_LIST_ROW_SELECT);

const carsListFiltersReset = createAction(actionTypes.CARS_LIST_RESET_FILTERS);

export const carsListResetFilters = () => dispatch => {
    dispatch(carsListFiltersReset());
    return dispatch(carsListFetch());
};