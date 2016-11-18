import { handleActions } from 'redux-actions';
import * as types from '../actionTypes';

const INITIAL_STATE = {
    isFetching: false,
    users: {},
    selectedId: -1
};

const dataReducer = handleActions({
    [types.FETCH_REQUEST]: (state, action) => ({
        ...state,
        isFetching: true,
        selectedId: -1
    }),

    [types.FETCH_SUCCESS]: (state, action) => ({
        ...state,
        isFetching: false,
        users: action.payload.data
    }),

    [types.FETCH_FAILURE]: (state, action) => ({
        ...state,
        isFetching: false
    }),

    [types.SELECT]: (state, action) => ({
        ...state,
        selectedId: action.payload
    }),

    [types.DELETE_REQUEST]: (state, action) => ({
        ...state,
        isFetching: true
    }),

    [types.DELETE_FAILURE]: (state, action) => ({
        ...state,
        isFetching: false
    }),

    [types.RESET]: (state, action) => INITIAL_STATE
}, INITIAL_STATE);

export default dataReducer;
