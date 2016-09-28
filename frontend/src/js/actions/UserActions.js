import querystring from 'querystring';

import * as userActions from '../constants/UserActionTypes';

import { CallApi } from '../util/APIUtil';

function userListRequest(pageable) {
    console.log('pageable:', pageable);

    const { number: page, size } = pageable;

    const request = CallApi.get('/api/pathUsers?'
        + querystring.stringify({ page, size }));

    return {
        type: userActions.USER_LIST_REQUEST,
        payload: request
    }
}

function userListSuccess(usersInfo) {
    return {
        type: userActions.USER_LIST_SUCCESS,
        payload: usersInfo
    }
}

function userListFailure(error) {
    return {
        type: userActions.USER_LIST_FAILURE,
        payload: error
    }
}

export function userList(dispatch, pageable) {
    dispatch(userListRequest(pageable))
        .then(response => {
            const status = response.error
                ? response.payload.response.status
                : response.payload.status;

            if (status === 200) {
                console.log('success:', response);
                dispatch(userListSuccess({
                    data: response.payload.data._embedded.pathUsers,
                    pageable: response.payload.data.page
                }));
            } else {
                dispatch(userListFailure(response.payload));
                alert('Ошибка на сервере. Повторите запрос позже');
            }
        });
}

export function userListReset() {
    return {
        type: userActions.USER_LIST_RESET
    }
}