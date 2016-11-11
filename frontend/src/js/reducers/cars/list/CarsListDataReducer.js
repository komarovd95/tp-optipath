import { handleActions } from 'redux-actions';

import * as actionTypes from '../../../constants/CarsActionTypes';

const INITIAL_STATE = {
    isFetching: false,
    cars: [],
    selectedIndex: -1
};

const carsListDataReducer = handleActions({
    [actionTypes.CARS_LIST_FETCH_REQUEST]: (state, action) => ({
        ...state,
        isFetching: true,
        selectedIndex: -1
    }),

    [actionTypes.CARS_LIST_FETCH_SUCCESS]: (state, action) => ({
        ...state,
        isFetching: false,
        cars: action.payload.data
    }),

    [actionTypes.CARS_LIST_FETCH_FAILURE]: (state, action) => ({
        ...state,
        isFetching: false
    }),

    [actionTypes.CARS_LIST_ROW_SELECT]: (state, action) => ({
        ...state,
        selectedIndex: action.payload
    }),

    [actionTypes.CARS_LIST_RESET]: (state, action) => INITIAL_STATE
}, INITIAL_STATE);

export default carsListDataReducer;
