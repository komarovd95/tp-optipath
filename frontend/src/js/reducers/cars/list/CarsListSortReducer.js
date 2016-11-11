import { handleActions } from 'redux-actions';

import * as actionTypes from '../../../constants/CarsActionTypes';

const INITIAL_STATE = {
    field: 'brand',
    direction: 'asc'
};

const carsListSortReducer = handleActions({
    [actionTypes.CARS_LIST_FETCH_REQUEST]: (state, action) => ({
        ...state,
        ...action.payload.sort
    }),

    [actionTypes.CARS_FORM_DESTROY]: (state, action) => ({
        ...state,
        ...action.payload.sort
    }),

    [actionTypes.CARS_LIST_RESET]: (state, action) => INITIAL_STATE
}, INITIAL_STATE);

export default carsListSortReducer;
