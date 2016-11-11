import { handleActions } from 'redux-actions';

import * as actionTypes from '../../../constants/BrandsActionTypes';

const INITIAL_STATE = {
    isShown: false
};

const brandsListModalReducer = handleActions({
    [actionTypes.BRANDS_LIST_MODAL_SHOW]: (state, action) => ({
        ...state,
        isShown: true
    }),

    [actionTypes.BRANDS_LIST_MODAL_CLOSE]: (state, action) => ({
        ...state,
        isShown: false
    }),

    [actionTypes.BRANDS_LIST_RESET]: (state, action) => INITIAL_STATE
}, INITIAL_STATE);

export default brandsListModalReducer;
