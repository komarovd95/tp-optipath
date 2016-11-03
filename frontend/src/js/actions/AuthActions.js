import querystring from 'querystring';
import { SubmissionError } from 'redux-form';
import { browserHistory } from 'react-router';

import { CallApi } from '../util/APIUtil';
import * as actionTypes from '../constants/AuthActionTypes';

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

function principalRequest() {
    return () => {
        return CallApi.get('api/pathUsers/user');
    }
}

export function signIn(redirectUrl = '/', { username, password }) {
    return (dispatch) => {
        dispatch(signInRequest());

        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };

        return CallApi.post('/signin',
            querystring.stringify({ username, password }), config)
            .then(response => {
                const { status } = response;

                if (status === 200) {
                    return dispatch(principalRequest());
                } else {
                    return Promise.reject(response);
                }
            }, error => {
                console.log('error:', error);
                const { status, data: { message } } = error.response;

                if (status === 401) {
                    dispatch(signInFailure(message));
                    throw new SubmissionError({
                        _error: message
                    })
                } else {
                    dispatch(signInFailure(status));
                    alert('Не удалось войти в систему. Повторите запрос позже');
                    return Promise.reject(status);
                }
            })
            .then(response => {
                const { status, data } = response;

                if (status === 200) {
                    dispatch(signInSuccess(data));

                    if (window.sessionStorage) {
                        window.sessionStorage.setItem('path-user',
                            JSON.stringify(data));
                    }

                    browserHistory.replace(redirectUrl);

                    return Promise.resolve(data);
                } else {
                    dispatch(signInFailure(data));
                    return Promise.reject(data);
                }
            });
    };
}

function signUpRequest() {
    return {
        type: actionTypes.SIGNUP_REQUEST
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

export function signUp({ username, password }) {
    return (dispatch) => {
        dispatch(signUpRequest());

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        return CallApi.post('/api/pathUsers',
            JSON.stringify({ username, password }), config)
            .then(response => {
                const { status, data } = response;

                if (status === 201) {
                    dispatch(signUpSuccess());
                    return dispatch(signIn('http://localhost:3000/me',
                        { username, password }));
                } else {
                    dispatch(signUpFailure(status));
                    return Promise.reject();
                }
            }, error => {
                const { status, data } = error.response;

                dispatch(signUpFailure(data));
                if (status === 500) {
                    throw new SubmissionError({
                        _error : data.message
                    });
                } else {
                    alert('Непредвиденная ошибка на сервере. Повторите запрос позже');
                    return Promise.reject(data);
                }
            });
    }
}

export function checkUsername(username) {
    return (dispatch) => {
        dispatch(checkUsernameRequest());

        return CallApi.get(`/api/pathUsers/search/findByUsernameExists?username=${username}`)
            .then(response => {
                const status = response.status;

                dispatch(checkUsernameAccept());

                if (status === 200) {
                    if (response.data) {
                        return Promise.reject({ username: [`Имя ${username} уже занято`] })
                    } else {
                        return Promise.resolve();
                    }
                } else {
                    return Promise.reject();
                }
            }, error => {
                const status = error.response.status;
                console.log(status);
                dispatch(checkUsernameAccept());
                return Promise.reject(status);
            });
    };
}

function signOutSuccess() {
    browserHistory.replace('/');
    window.sessionStorage.removeItem('path-user');

    return {
        type: actionTypes.SIGNOUT_SUCCESS
    }
}

export function signOut() {
    return (dispatch) => {
        return CallApi.get('/signout')
            .then(response => {
                const status = response.status;

                dispatch(signOutSuccess());

                if (status !== 200) {
                    return Promise.reject(status);
                }
            });
    }
}

function checkUsernameRequest() {
    return {
        type: actionTypes.CHECK_USERNAME_REQUEST
    }
}

function checkUsernameAccept() {
    return {
        type: actionTypes.CHECK_USERNAME_ACCEPT
    }
}