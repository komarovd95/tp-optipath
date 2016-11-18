import { handleActions } from 'redux-actions';
import * as types from '../actionTypes';

const INITIAL_STATE = {
    field: 'id',
    direction: 'asc'
};

const sortReducer = handleActions({
    [types.FETCH_REQUEST]: (state, action) => ({
        ...state,
        ...action.payload.sort
    }),

    [types.RESET]: (state, action) => INITIAL_STATE
}, INITIAL_STATE);

export default sortReducer;
