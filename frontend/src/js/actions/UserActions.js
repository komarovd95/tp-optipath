import querystring from 'querystring';

import * as userActions from '../constants/UserActionTypes';

import { CallApi } from '../util/APIUtil';

function userListRequest() {
    // console.log('pageable:', pageable);
    //
    // const { number: page, size } = pageable;
    //
    // const request = CallApi.get('/api/pathUsers?'
    //     + querystring.stringify({ page, size }));

    return {
        type: userActions.USER_LIST_REQUEST
        // payload: request
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

export function userListThunk({ number: page, size, sort, username }) {
    return (dispatch) => {
        dispatch(userListRequest());

        const requestData = { page, size, username };

        if (sort) {
            requestData.sort = sort.field + ','
                + (sort.isAscending ? 'asc' : 'desc');
        }

        return CallApi.get('/api/pathUsers/search/findAllByUsernameContaining?'
            + window.decodeURIComponent(querystring.stringify(requestData)))
            .then(response => {
                const status = response.status;

                if (status === 200) {
                    dispatch(userListSuccess({
                        data: response.data._embedded.pathUsers,
                        pageable: {
                            ...response.data.page,
                            sort
                        }
                    }));
                } else {
                    console.log(status);
                    return Promise.reject();
                }
            }, error => {
                dispatch(userListFailure(error));
                alert('Ошибка на сервере. Повторите запрос позже');
                return Promise.reject(error);
            });
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

export function userEnableActions(actions) {
    return {
        type: userActions.USER_ENABLE_ACTIONS,
        payload: actions
    }
}