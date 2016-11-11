import { createAction } from 'redux-actions';
import axios from 'axios';

import { CallApi } from '../../util/APIUtil';

import * as actionTypes from '../../constants/CarsActionTypes';


const LOAD_ERROR = 'Ошибка при загрузке данных. Попробуйте позже';

const carsCacheLoadRequest = createAction(actionTypes.CARS_CACHE_LOAD_REQUEST);
const carsCacheLoadSuccess = createAction(actionTypes.CARS_CACHE_LOAD_SUCCESS);
const carsCacheLoadFailure = createAction(actionTypes.CARS_CACHE_LOAD_FAILURE,
    errorMessage => ({
        error: errorMessage,
        globalError: !!errorMessage
    }));

export const carsCacheLoad = (forced) => (dispatch, getState) => {
    dispatch(carsCacheLoadRequest());

    const oldCache = getState().cars.cache;

    if (!oldCache.brands || !oldCache.fuelTypes || forced) {
        return axios.all([CallApi.get('/api/carBrands'), CallApi.get('/api/fuelTypes')])
            .then(axios.spread((res1, res2) => {
                const status1 = res1.status;
                const status2 = res2.status;

                if (status1 === 200 && status2 === 200) {
                    const brands = res1.data['_embedded'] && res1.data['_embedded'].carBrands;
                    const fuelTypes = res2.data['_embedded'] && res2.data['_embedded'].fuelTypes;

                    dispatch(carsCacheLoadSuccess({ brands, fuelTypes }));

                    return Promise.resolve();
                } else {
                    dispatch(carsCacheLoadFailure(LOAD_ERROR));
                    return Promise.reject({ res1, res2 });
                }
            }), error => {
                dispatch(carsCacheLoadFailure(LOAD_ERROR));
                return Promise.reject(error.response);
            })
    } else {
        return new Promise(resolve => {
            dispatch(carsCacheLoadSuccess({
                brands: oldCache.brands,
                fuelTypes: oldCache.fuelTypes
            }));
            return resolve();
        })
    }
};