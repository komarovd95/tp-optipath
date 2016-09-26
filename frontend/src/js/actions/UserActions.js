import * as userActions from '../constants/UserActionTypes';

import { CallApi } from '../util/APIUtil';

function userListRequest(pageable) {
    const request = CallApi.get('/api/pathUsers', pageable);

    return {
        type: userActions.USER_LIST_REQUEST,
        payload: request
    }
}

function userListSuccess(users) {
    return {
        type: userActions.USER_LIST_SUCCESS,
        payload: users
    }
}

function userListFailure(error) {
    return {
        type: userActions.USER_LIST_FAILURE,
        payload: error
    }
}

export function userList(dispatch, pageable) {
    return dispatch(userListRequest(pageable))
        .then(response => {
            console.log(response);
        });
}