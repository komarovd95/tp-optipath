import { handleActions } from 'redux-actions';

import {
    USERS_LIST_FETCH_REQUEST, USERS_LIST_RESET
} from '../../../constants/UsersActionTypes';

const INITIAL_STATE = {
    username: ''
};

const usersListFilterReducer = handleActions({
    [USERS_LIST_FETCH_REQUEST]: (state, action) => ({
        ...state,
        ...action.payload.filter
    }),

    [USERS_LIST_RESET]: (state, action) => INITIAL_STATE
}, INITIAL_STATE);

export default usersListFilterReducer;
