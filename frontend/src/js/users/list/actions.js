import {createAction} from 'redux-actions';
import {CallApi} from '../../util/APIUtil';
import {
    createGlobalInfoAction, createGlobalErrorAction
} from '../../notifications/actions';

import {
    FETCH_URL, FETCH_ERROR_MESSAGE, DELETE_ERROR_MESSAGE,
    DELETE_SUCCESS_MESSAGE, CHANGE_ROLE_SUCCESS_MESSAGE, CHANGE_ROLE_ERROR_MESSAGE
} from './constants';
import {RESOURCE_URL} from '../constants';
import * as types from './actionTypes';
import {getDataFromResponse} from './model';
import {
    getSelectedUserSelector, getPersistedListState, getUserByUsername
} from './selectors';
import {activateTab} from '../../profile/actions';


const fetchRequest = createAction(types.FETCH_REQUEST);
const fetchSuccess = createAction(types.FETCH_SUCCESS);
const fetchFailure = createGlobalErrorAction(types.FETCH_FAILURE);

export const fetch = (pageable, sort, filter) => (dispatch, getState) => {
    const { list: {pageable: p, sort: s, filter: f}} = getState().users;

    dispatch(fetchRequest({
        pageable: pageable || p,
        sort: sort || s,
        filter: filter || f
    }));

    return CallApi.fetchList(FETCH_URL, pageable || p, sort || s, filter || f)
        .then(response => {
            if (response.status === 200) {
                const users = getDataFromResponse(response.data);

                dispatch(fetchSuccess({
                    data: users,
                    pageable: response.data.page
                }));

                return Promise.resolve(users);
            } else {
                dispatch(fetchFailure(FETCH_ERROR_MESSAGE));
                return Promise.reject(response);
            }
        }, error => {
            dispatch(fetchFailure(FETCH_ERROR_MESSAGE));
            return Promise.reject(error.response);
        })
};

export const reset = createAction(types.RESET);

export const select = createAction(types.SELECT, user => user ? user.id : -1);

const deleteRequest = createAction(types.DELETE_REQUEST);
const deleteSuccess = createGlobalInfoAction(types.DELETE_SUCCESS);
const deleteFailure = createGlobalErrorAction(types.DELETE_FAILURE);

export const deleteUser = (user) => (dispatch, getState) => {
    const state = getState();
    const usersCount = state.users.list.data.users.result
        ? state.users.list.data.users.result.length : 0;

    const selectedUser = user ? user : getSelectedUserSelector(state);

    let pageable = state.users.list.pageable;

    dispatch(deleteRequest());
    return CallApi.remove(`${RESOURCE_URL}/${selectedUser.id}`)
        .then(response => {
            if (response.status === 204) {
                dispatch(deleteSuccess(DELETE_SUCCESS_MESSAGE));

                if (usersCount === 1) {
                    pageable = {
                        ...pageable,
                        number: Math.max(0, pageable.number - 1)
                    };
                }

                return dispatch(fetch(pageable))
            } else {
                dispatch(deleteFailure(DELETE_ERROR_MESSAGE));
                return Promise.reject(response)
            }
        }, error => {
            dispatch(deleteFailure(DELETE_ERROR_MESSAGE));
            return Promise.reject(error.response)
        })
};

export const changeFilter = createAction(types.FILTER_CHANGE);

const changeRoleRequest = createAction(types.CHANGE_ROLE_REQUEST);
const changeRoleSuccess = createGlobalInfoAction(types.CHANGE_ROLE_SUCCESS);
const changeRoleFailure = createGlobalErrorAction(types.CHANGE_ROLE_FAILURE);

export const changeRole = (user) => (dispatch, getState) => {
    const selectedUser = user ? user : getSelectedUserSelector(getState());

    const requestData = {
        roles: ['ROLE_USER', 'ROLE_ADMIN']
    };

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    dispatch(changeRoleRequest());
    return CallApi.patch(`${RESOURCE_URL}/${selectedUser.id}`,
        JSON.stringify(requestData), config).then(response => {
            if (response.status === 200) {
                dispatch(changeRoleSuccess(CHANGE_ROLE_SUCCESS_MESSAGE));
                return dispatch(fetch());
            } else {
                dispatch(changeRoleFailure(CHANGE_ROLE_ERROR_MESSAGE));
                return Promise.reject(response);
            }
    }, error => {
        dispatch(changeRoleFailure(CHANGE_ROLE_ERROR_MESSAGE));
        return Promise.reject(error.response);
    })
};

export const seeProfile = (username) => (dispatch, getState) => {
    dispatch(activateTab('profile', getPersistedListState, {
        users: {
            profile: {
                user: getUserByUsername(getState(), username)
            }
        }
    }))
};