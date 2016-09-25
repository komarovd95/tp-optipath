import querystring from 'querystring';
import { SubmissionError } from 'redux-form';
import { browserHistory } from 'react-router';

import { CallApi } from '../util/APIUtil';
import * as actionTypes from '../constants/AuthActionTypes';

function signInRequest(credentials) {
    const { username, password } = credentials;

    const config = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };

    const request = CallApi.post('/signin',
        querystring.stringify({ username, password }), config);

    return {
        type: actionTypes.SIGNIN_REQUEST,
        payload: request
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
        type: actionTypes.SIGNIN_SUCCESS,
        payload: error
    }
}

function principalRequest() {
    const request = CallApi.get('/user');

    return {
        type: actionTypes.PRINCIPAL_REQUEST,
        payload: request
    }
}

export function signIn(redirectUrl = '/', values, dispatch) {
    console.log(arguments);

    return dispatch(signInRequest(values))
        .then(response => {
            const status = response.error
                ? response.payload.response.status
                : response.payload.status;

            if (status === 200) {
                dispatch(principalRequest())
                    .then(principalResponse => {
                        const payload = principalResponse.payload;
                            console.log(payload);

                        if (payload.status === 200) {
                            dispatch(signInSuccess(payload.data));
                            window.sessionStorage.setItem('path-user',
                                JSON.stringify(payload.data));

                            browserHistory.replace(redirectUrl);
                        } else {
                            dispatch(signInFailure(payload));
                            alert('Не удалось войти в систему. Повторите запрос позже');
                        }
                    });
            } else {
                dispatch(signInFailure(response.payload));
                if (status === 401) {
                    throw new SubmissionError({
                        _error : response.payload.response.data.message
                    });
                } else {
                    alert('Непредвиденная ошибка на сервере. Повторите запрос позже');
                }
            }
        });
}

function signUpRequest(credentials) {
    const { username, password } = credentials;

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const request = CallApi.post('/api/pathUsers',
        JSON.stringify({ username, password }), config);

    return {
        type: actionTypes.SIGNUP_REQUEST,
        payload: request
    }
}

function signUpSuccess() {
    return {
        type: actionTypes.SIGNUP_SUCCESS
    }
}

function signUpFailure(error) {
    return {
        type: actionTypes.SIGNUP_FAILURE,
        payload: error
    }
}

export function signUp(values, dispatch) {
    return dispatch(signUpRequest(values))
        .then(response => {
            const status = response.payload.error
                ? response.payload.response.status
                : response.payload.status;

            if (status === 201) {
                dispatch(signUpSuccess());
                signIn('http://localhost:3000/me', values, dispatch); // todo
            } else {
                dispatch(signUpFailure(response.payload));
                if (status === 500) {
                    throw new SubmissionError({
                        _error : response.payload.response.data.message
                    });
                } else {
                    alert('Непредвиденная ошибка на сервере. Повторите запрос позже');
                }
            }
        });
}

function signOutRequest() {
    const request = CallApi.get('/signout');

    return {
        type: actionTypes.SIGNOUT_REQUEST,
        payload: request
    }
}

function signOutSuccess() {
    browserHistory.setState({
        isSignedOut: true
    });
    // browserHistory.push({
    //     pathname: '/',
    //     state: {
    //         isSignedOut: true
    //     }
    // });

    return {
        type: actionTypes.SIGNOUT_SUCCESS
    }
}

export function signOut(dispatch) {
    return dispatch(signOutRequest())
        .then(response => {
            const status = response.payload.error
                ? response.payload.response.status
                : response.payload.status;

            dispatch(signOutSuccess());
            if (status === 200) {
                window.sessionStorage.removeItem('path-user');
            } else {
                console.log(response.payload.response.data.message);
            }
        });
}