import { handleActions } from 'redux-actions';

import * as actionTypes from '../../../constants/BrandsActionTypes';

const INITIAL_STATE = {
    field: 'id',
    direction: 'asc'
};

const brandsListSortReducer = handleActions({
    [actionTypes.BRANDS_LIST_FETCH_REQUEST]: (state, action) => ({
        ...state,
        ...action.payload.sort
    }),

    [actionTypes.BRANDS_LIST_RESET]: (state, action) => INITIAL_STATE
}, INITIAL_STATE);

export default brandsListSortReducer;
