import { handleActions } from 'redux-actions';

import {
    USERS_LIST_FETCH_REQUEST, USERS_LIST_FETCH_SUCCESS, USERS_LIST_RESET
} from '../../../constants/UsersActionTypes';

const INITIAL_STATE = {
    number: 0,
    size: 20,
    totalPages: 0
};

const usersListPageableReducer = handleActions({
    [USERS_LIST_FETCH_REQUEST]: (state, action) => ({
        ...state,
        number: action.payload.pageable.number,
        size: action.payload.pageable.size
    }),

    [USERS_LIST_FETCH_SUCCESS]: (state, action) => ({
        ...state,
        ...action.payload.pageable
    }),

    [USERS_LIST_RESET]: (state, action) => INITIAL_STATE
}, INITIAL_STATE);

export default usersListPageableReducer;

