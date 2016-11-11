import { handleActions } from 'redux-actions';

import {
    USERS_LIST_FETCH_REQUEST, USERS_LIST_RESET
} from '../../../constants/UsersActionTypes';

const INITIAL_STATE = {
    field: 'id',
    direction: 'asc'
};

const usersListSortReducer = handleActions({
    [USERS_LIST_FETCH_REQUEST]: (state, action) => ({
        ...state,
        ...action.payload.sort
    }),

    [USERS_LIST_RESET]: (state, action) => INITIAL_STATE
}, INITIAL_STATE);

export default usersListSortReducer;
