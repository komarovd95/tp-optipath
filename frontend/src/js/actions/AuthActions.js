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
        payload: true,
        globalError: true,
        error: error
    }
}

function principalRequest() {
    return () => {
        return CallApi.get('api/users/user');
    }
}

export function signIn(redirectUrl = '/', { username, password }) {
    const ERROR = 'Не удалось войти в систему. Повторите запрос позже';

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
                const status = response.status;

                if (status === 200) {
                    return dispatch(principalRequest());
                } else {
                    dispatch(signInFailure(ERROR));
                    return Promise.reject(status);
                }
            }, error => {
                const { status, data: { message } } = error.response;

                if (status === 401) {
                    dispatch(signInFailure());
                    throw new SubmissionError({
                        _error: message
                    })
                } else {
                    dispatch(signInFailure(ERROR));
                    return Promise.reject(status);
                }
            })
            .then(response => {
                const { status, data } = response;

                if (status === 200) {
                    if (window.sessionStorage) {
                        window.sessionStorage.setItem('path-user',
                            JSON.stringify(data));
                    }

                    dispatch(signInSuccess(data));

                    browserHistory.replace(redirectUrl);

                    return Promise.resolve(data);
                } else {
                    dispatch(signInFailure(ERROR));
                    return Promise.reject(status);
                }
            });
    };
}

function signUpRequest() {
    return {
        type: actionTypes.SIGNUP_REQUEST
    }
}

function signUpFailure(error) {
    return {
        type: actionTypes.SIGNUP_FAILURE,
        payload: true,
        globalError: true,
        error: error
    }
}

export function signUp({ username, password }) {
    const ERROR = 'Не удалось зарегистрироваться. Повторите запрос позже';

    return (dispatch) => {
        dispatch(signUpRequest());

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        return CallApi.post('/api/users',
            JSON.stringify({ username, password }), config)
            .then(response => {
                const { status } = response;

                if (status === 201) {
                    //dispatch(signUpSuccess());
                    return dispatch(signIn('http://localhost:3000/me',
                        { username, password }));
                } else {
                    dispatch(signUpFailure(ERROR));
                    return Promise.reject(status);
                }
            }, error => {
                const { status, data } = error.response;

                if (status === 500) {
                    dispatch(signUpFailure());
                    throw new SubmissionError({
                        _error : data.message
                    });
                } else {
                    dispatch(signUpFailure(ERROR));
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

export function checkUsername(username) {
    const ERROR = 'Ошибка на сервере. Повторите запрос позже';

    return (dispatch) => {
        dispatch(checkUsernameRequest());

        return CallApi.get(`/api/users/search/findByUsernameExists?username=${username}`)
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
                    dispatch({ payload: true, globalError: true, error: ERROR });
                    return Promise.reject(status);
                }
            }, error => {
                const status = error.response.status;
                dispatch(checkUsernameAccept());
                dispatch({ payload: true, globalError: true, error: ERROR });
                return Promise.reject(status);
            });
    };
}

function signOutSuccess() {
    return {
        type: actionTypes.SIGNOUT_SUCCESS
    }
}

export function signOut() {
    return (dispatch) => {
        return CallApi.get('/signout')
            .then(response => {
                const status = response.status;

                browserHistory.replace('/');
                window.sessionStorage.removeItem('path-user');

                dispatch(signOutSuccess());

                if (status !== 200) {
                    return Promise.reject(status);
                }
            });
    }
}