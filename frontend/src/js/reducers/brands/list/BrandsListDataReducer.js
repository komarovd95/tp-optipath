import { handleActions } from 'redux-actions';

import * as actionTypes from '../../../constants/BrandsActionTypes';

const INITIAL_STATE = {
    isFetching: false,
    brands: [],
    selectedIndex: -1
};

const brandsListDataReducer = handleActions({
    [actionTypes.BRANDS_LIST_FETCH_REQUEST]: (state, action) => ({
        ...state,
        isFetching: true,
        selectedIndex: -1
    }),

    [actionTypes.BRANDS_LIST_FETCH_SUCCESS]: (state, action) => ({
        ...state,
        isFetching: false,
        brands: action.payload.data
    }),

    [actionTypes.BRANDS_LIST_FETCH_FAILURE]: (state, action) => ({
        ...state,
        isFetching: false
    }),

    [actionTypes.BRANDS_LIST_ROW_SELECT]: (state, action) => ({
        ...state,
        selectedIndex: action.payload
    }),

    [actionTypes.BRANDS_LIST_ROW_UPDATE]: (state, action) => ({
        ...state,
        brands: action.payload
    }),

    [actionTypes.BRANDS_LIST_RESET]: (state, action) => INITIAL_STATE
}, INITIAL_STATE);

export default brandsListDataReducer;
