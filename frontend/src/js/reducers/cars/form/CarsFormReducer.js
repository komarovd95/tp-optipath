import { handleActions } from 'redux-actions';

import * as actionTypes from '../../../constants/CarsActionTypes';

const INITIAL_STATE = {
    action: '',
    car: null,
    transitState: null
};

const carsFormReducer = handleActions({
    [actionTypes.CARS_FORM_INIT]: (state, action) => {
        const { action: initAction, car, ...transitState } = action.payload;

        return {
            action: initAction,
            car,
            transitState
        }
    },

    [actionTypes.CARS_FORM_DESTROY]: (state, action) => INITIAL_STATE
}, INITIAL_STATE);

export default carsFormReducer;
