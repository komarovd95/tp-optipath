import { handleActions } from 'redux-actions';

import {
    USERS_LIST_MODAL_SHOW, USERS_LIST_MODAL_CLOSE, USERS_LIST_RESET
} from '../../../constants/UsersActionTypes';

const INITIAL_STATE = {
    isShown: false
};

const usersListPageableReducer = handleActions({
    [USERS_LIST_MODAL_SHOW]: (state, action) => ({
        ...state,
        isShown: true
    }),

    [USERS_LIST_MODAL_CLOSE]: (state, action) => ({
        ...state,
        isShown: false
    }),

    [USERS_LIST_RESET]: (state, action) => INITIAL_STATE
}, INITIAL_STATE);

export default usersListPageableReducer;
