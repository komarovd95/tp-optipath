import { handleActions } from 'redux-actions';

import * as actionTypes from '../../../constants/CarsActionTypes';

const INITIAL_STATE = {
    brand: '',
    name: '',
    fuelType: '',
    fuelConsumption: '',
    maxVelocity: ''
};

const carsListFilterReducer = handleActions({
    [actionTypes.CARS_LIST_FETCH_REQUEST]: (state, action) => ({
        ...state,
        ...action.payload.filter
    }),

    [actionTypes.CARS_FORM_DESTROY]: (state, action) => ({
        ...state,
        ...action.payload.filter
    }),

    [actionTypes.CARS_LIST_RESET_FILTERS]: (state, action) => INITIAL_STATE,

    [actionTypes.CARS_LIST_RESET]: (state, action) => INITIAL_STATE
}, INITIAL_STATE);

export default carsListFilterReducer;