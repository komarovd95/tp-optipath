import { handleActions } from 'redux-actions';

import * as actionTypes from '../../../constants/BrandsActionTypes';

const INITIAL_STATE = {
    brandName: ''
};

const brandsListFilterReducer = handleActions({
    [actionTypes.BRANDS_LIST_FETCH_REQUEST]: (state, action) => ({
        ...state,
        ...action.payload.filter
    }),

    [actionTypes.BRANDS_LIST_RESET]: (state, action) => INITIAL_STATE
}, INITIAL_STATE);

export default brandsListFilterReducer;
