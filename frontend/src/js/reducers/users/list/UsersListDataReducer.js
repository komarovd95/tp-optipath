import { handleActions } from 'redux-actions';

import {
    USERS_LIST_FETCH_REQUEST, USERS_LIST_FETCH_SUCCESS, USERS_LIST_FETCH_FAILURE,
    USERS_LIST_ROW_SELECT, USERS_LIST_RESET
} from '../../../constants/UsersActionTypes';

const INITIAL_STATE = {
    isFetching: false,
    users: [],
    selectedIndex: -1
};

const usersListDataReducer = handleActions({
    [USERS_LIST_FETCH_REQUEST]: (state, action) => ({
        ...state,
        isFetching: true,
        selectedIndex: -1
    }),

    [USERS_LIST_FETCH_SUCCESS]: (state, action) => ({
        ...state,
        isFetching: false,
        users: action.payload.data
    }),

    [USERS_LIST_FETCH_FAILURE]: (state, action) => ({
        ...state,
        isFetching: false
    }),

    [USERS_LIST_ROW_SELECT]: (state, action) => ({
        ...state,
        selectedIndex: action.payload
    }),

    [USERS_LIST_RESET]: (state, action) => INITIAL_STATE
}, INITIAL_STATE);

export default usersListDataReducer;
