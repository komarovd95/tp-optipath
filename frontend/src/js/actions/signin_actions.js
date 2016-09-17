import { SIGNIN_REQUEST, SIGNIN_SUCCESS, SIGNIN_FAILURE } from '../constants/signin';

import axios from 'axios';

export function signIn(credentials) {
    const config = {
        headers: {
            'Content-Type' : 'application/x-www-form-urlencoded',
            'Authorization' : 'Basic ' + window.btoa(credentials.login + ':' + credentials.password)
        }
    };

    const request = axios.post('/login', {}, config);

    return {
        type: SIGNIN_REQUEST,
        payload: request
    }
}

export function signInSuccess(user) {
    return {
        type: SIGNIN_SUCCESS,
        payload: user
    }
}

export function signInFailure(error) {
    return {
        type: SIGNIN_FAILURE,
        payload: error
    }
}