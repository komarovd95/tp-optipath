import querystring from 'querystring';

import * as userActions from '../constants/UserActionTypes';

import { CallApi } from '../util/APIUtil';

function userListRequest() {
    return {
        type: userActions.USER_LIST_REQUEST
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

export function userList({ number: page, size, sort }, filter) {
    return (dispatch) => {
        dispatch(userListRequest());

        const requestData = { page, size };

        if (sort) {
            requestData.sort = sort.field + ','
                + (sort.isAscending ? 'asc' : 'desc');
        }

        if (filter) {
            for (let property in filter) {
                if (filter.hasOwnProperty(property) && filter[property]) {
                    requestData[property] = filter[property];
                }
            }
        }

        return CallApi.get('/api/pathUsers/search/filter?'
            + window.decodeURIComponent(querystring.stringify(requestData)))
            .then(response => {
                const status = response.status;

                if (status === 200) {
                    const data = response.data._embedded ?
                        response.data._embedded.pathUsers : [];

                    dispatch(userListSuccess({
                        data,
                        pageable: {
                            ...response.data.page,
                            sort
                        },
                        filter
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

export function userListReset() {
    return {
        type: userActions.USER_LIST_RESET
    }
}

export function userEnableActions(selectedUser = null, actions = []) {
    return {
        type: userActions.USER_ENABLE_ACTIONS,
        payload: {
            actions,
            selectedUser
        }
    }
}

export function userDeleteModalShow() {
    return {
        type: userActions.USER_DELETE_SHOW
    }
}

export function userDeleteModalClose() {
    return {
        type: userActions.USER_DELETE_CLOSE
    }
}

function userDeleteRequest() {
    return {
        type: userActions.USER_DELETE_REQUEST
    }
}

function userDeleteSuccess() {
    return {
        type: userActions.USER_DELETE_SUCCESS
    }
}

function userDeleteFailure(error) {
    return {
        type: userActions.USER_DELETE_FAILURE,
        payload: error
    }
}

export function userDelete(pageable = {}, user) {
    return (dispatch) => {
        dispatch(userDeleteRequest());

        return CallApi.remove(`/api/pathUsers/${user.id}`)
            .then(response => {
                const status = response.status;

                if (status === 204) {
                    dispatch(userDeleteSuccess());

                    if (pageable.totalElements % pageable.size === 1) {
                        pageable.number = Math.max(0, pageable.number - 1);
                    }

                    return dispatch(userList(pageable))
                } else {
                    console.log(response);
                    return Promise.reject(status);
                }
            }, error => {
                alert('Непредвиденная ошибка. Повторите запрос позже');
                dispatch(userDeleteFailure(error.response.data.message));
                return Promise.reject(error);
            })

    }
}