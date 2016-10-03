import * as actionTypes from '../constants/AuthActionTypes';

import { CallApi } from '../util/APIUtil';

function signInRequest() {
    return {
        type: actionTypes.SIGNIN_REQUEST
    }
}

function signInSuccess(user) {
    return {
        type: actionTypes.SIGNIN_SUCCESS,
        payload: user
    }
}

function signInFailure(error) {
    return {
        type: actionTypes.SIGNIN_FAILURE,
        payload: error
    }
}

function signIn({ username, password }) {
    return dispatch => {
        dispatch(signInRequest());

        return CallApi.get('/user', {})
    }
}

function signInHook(token) {
    return dispatch => {
        dispatch(signInRequest());

        return CallApi.get('/user', token)
            .then(response => {
                return Promise.resolve(response);
            });
    }
}