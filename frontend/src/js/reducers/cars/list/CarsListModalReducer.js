import { handleActions } from 'redux-actions';

import * as actionTypes from '../../../constants/CarsActionTypes';

const INITIAL_STATE = {
    isShown: false
};

const carsListModalReducer = handleActions({
    [actionTypes.CARS_LIST_MODAL_SHOW]: (state, action) => ({
        ...state,
        isShown: true
    }),

    [actionTypes.CARS_LIST_MODAL_CLOSE]: (state, action) => ({
        ...state,
        isShown: false
    }),

    [actionTypes.CARS_LIST_RESET]: (state, action) => INITIAL_STATE
}, INITIAL_STATE);

export default carsListModalReducer;
