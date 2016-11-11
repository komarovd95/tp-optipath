import { handleActions } from 'redux-actions';

import * as actionTypes from '../../../constants/CarsActionTypes';


const INITIAL_STATE = {
    isFetching: false,
    brands: null,
    fuelTypes: null
};

const carsCacheReducer = handleActions({
    [actionTypes.CARS_CACHE_LOAD_REQUEST]: (state, action) => ({
        ...state,
        isFetching: true
    }),

    [actionTypes.CARS_CACHE_LOAD_SUCCESS]: (state, action) => ({
        ...state,
        isFetching: false,
        brands: action.payload.brands,
        fuelTypes: action.payload.fuelTypes
    }),

    [actionTypes.CARS_CACHE_LOAD_FAILURE]: (state, action) => ({
        ...state,
        isFetching: false
    })
}, INITIAL_STATE);

export default carsCacheReducer;
