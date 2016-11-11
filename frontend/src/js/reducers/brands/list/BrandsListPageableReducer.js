import { handleActions } from 'redux-actions';

import * as actionTypes from '../../../constants/BrandsActionTypes';

const INITIAL_STATE = {
    number: 0,
    size: 20,
    totalPages: 0
};

const brandsListPageableReducer = handleActions({
    [actionTypes.BRANDS_LIST_FETCH_REQUEST]: (state, action) => ({
        ...state,
        number: action.payload.pageable.number,
        size: action.payload.pageable.size
    }),

    [actionTypes.BRANDS_LIST_FETCH_SUCCESS]: (state, action) => ({
        ...state,
        ...action.payload.pageable
    }),

    [actionTypes.BRANDS_LIST_RESET]: (state, action) => INITIAL_STATE
}, INITIAL_STATE);

export default brandsListPageableReducer;

