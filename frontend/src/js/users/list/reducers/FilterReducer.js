import {handleActions} from 'redux-actions';
import * as types from '../actionTypes';

const INITIAL_STATE = {
    username: ''
};

const filterReducer = handleActions({
    [types.FILTER_CHANGE]: (state, action) => ({
        ...state,
        username: action.payload
    }),

    [types.RESET]: (state, action) => INITIAL_STATE
}, INITIAL_STATE);

export default filterReducer;
