import {createAction} from 'redux-actions';
import isEmpty from 'lodash/isEmpty';
import {createLoggedErrorAction as createError} from '../notifications/actions';
import * as types from './actionTypes';
import {RESOURCE_URL} from './constants';
import {PathUser, getUsersFromResponseData} from './model';
import {CallApi} from '../util/APIUtil';


const loggedUserRequest = createAction(types.LOGGED_USER_REQUEST);
const loggedUserSuccess = createAction(types.LOGGED_USER_SUCCESS);
const loggedUserFailure = createError(types.LOGGED_USER_FAILURE);

export const getLoggedUser = () => (dispatch) => {
    dispatch(loggedUserRequest());

    return CallApi.get(`${RESOURCE_URL}/user`)
        .then(response => {
            if (response.status === 200) {
                const user = new PathUser(response.data);
                dispatch(loggedUserSuccess(user));
                return Promise.resolve(user);
            } else {
                dispatch(loggedUserFailure(response));
                return Promise.reject(response);
            }
        }, error => {
            dispatch(loggedUserFailure(error));
            return Promise.reject(error.response);
        })
};


const fetchListRequest = createAction(types.FETCH_USERS_REQUEST);
const fetchListSuccess = createAction(types.FETCH_USERS_SUCCESS);
const fetchListFailure = createError(types.FETCH_USERS_FAILURE);

export const fetchList = (pageable, sort, filter) => (dispatch) => {
    dispatch(fetchListRequest());

    return CallApi.fetchList(`${RESOURCE_URL}/search/filter`, pageable, sort, filter)
        .then(response => {
            if (response.status === 200) {
                const responseData = {
                    users: getUsersFromResponseData(response.data),
                    pageable: response.data.page
                };

                dispatch(fetchListSuccess(responseData));

                return Promise.resolve(responseData);
            } else {
                dispatch(fetchListFailure(response));
                return Promise.reject(response);
            }
        }, error => {
            dispatch(fetchListFailure(error));
            return Promise.reject(error.response);
        })
};


const createUserRequest = createAction(types.CREATE_USER_REQUEST);
const createUserSuccess = createAction(types.CREATE_USER_SUCCESS);
const createUserFailure = createError(types.CREATE_USER_FAILURE);

export const createUser = (data) => (dispatch) => {
    dispatch(createUserRequest());

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    return CallApi.post(RESOURCE_URL, JSON.stringify(data), config)
        .then(response => {
            if (response.status === 201) {
                const user = new PathUser(response.data);
                dispatch(createUserSuccess(user));
                return Promise.resolve(user);
            } else {
                dispatch(createUserFailure(response));
                return Promise.reject(response);
            }
        }, error => {
            dispatch(createUserFailure(error));
            return Promise.reject(error.response);
        })
};


const changeUserRequest = createAction(types.CHANGE_USER_REQUEST);
const changeUserSuccess = createAction(types.CHANGE_USER_SUCCESS);
const changeUserFailure = createError(types.CHANGE_USER_FAILURE);

export const changeUser = (user, {password, toAdmin, driveStyle}) => (dispatch) => {
    const requestData = {};

    if (password) {
        requestData.password = password;
    }

    if (toAdmin) {
        requestData.roles = ['ROLE_USER', 'ROLE_ADMIN'];
    }

    if (driveStyle) {
        requestData.driveStyle = driveStyle;
    }

    if (isEmpty(requestData)) {
        return new Promise(resolve => resolve(user))
    }

    dispatch(changeUserRequest());

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    return CallApi.patch(`${RESOURCE_URL}/${user.id}`,
        JSON.stringify(requestData), config).then(response => {
            if (response.status === 200) {
                const user = new PathUser(response.data);
                dispatch(changeUserSuccess(user));
                return Promise.resolve(user);
            } else {
                dispatch(changeUserFailure(response));
                return Promise.reject(response);
            }
        }, error => {
            dispatch(changeUserFailure(error));
            return Promise.reject(error.response);
        })
};
