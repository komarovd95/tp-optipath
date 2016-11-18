import { handleActions } from 'redux-actions';
import * as types from '../actionTypes';

const INITIAL_STATE = {
    number: 0,
    size: 25,
    totalPages: 0
};

const pageableReducer = handleActions({
    [types.FETCH_REQUEST]: (state, action) => ({
        ...state,
        number: action.payload.pageable.number,
        size: action.payload.pageable.size
    }),

    [types.FETCH_SUCCESS]: (state, action) => ({
        ...state,
        number: action.payload.pageable.number,
        size: action.payload.pageable.size,
        totalPages: action.payload.pageable.totalPages
    }),

    [types.RESET]: (state, action) => INITIAL_STATE
}, INITIAL_STATE);

export default pageableReducer;
