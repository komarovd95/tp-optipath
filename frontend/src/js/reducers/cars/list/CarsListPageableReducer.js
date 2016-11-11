import { handleActions } from 'redux-actions';

import * as actionTypes from '../../../constants/CarsActionTypes';

const INITIAL_STATE = {
    number: 0,
    size: 20,
    totalPages: 0
};

const carsListPageableReducer = handleActions({
    [actionTypes.CARS_LIST_FETCH_REQUEST]: (state, action) => ({
        ...state,
        number: action.payload.pageable.number,
        size: action.payload.pageable.size
    }),

    [actionTypes.CARS_LIST_FETCH_SUCCESS]: (state, action) => ({
        ...state,
        ...action.payload.pageable
    }),

    [actionTypes.CARS_FORM_DESTROY]: (state, action) => ({
        ...state,
        ...action.payload.pageable
    }),

    [actionTypes.CARS_LIST_RESET]: (state, action) => INITIAL_STATE
}, INITIAL_STATE);

export default carsListPageableReducer;
