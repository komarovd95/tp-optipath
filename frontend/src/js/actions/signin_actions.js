import axios from 'axios';
import querystring from 'querystring';

import { SIGNIN_REQUEST, SIGNIN_SUCCESS, SIGNIN_FAILURE, PRINCIPAL_REQUEST } from '../constants/signin';
import transformUrl from '../util/call_api';


export function signIn(credentials) {
    const { username, password } = credentials;

    const config = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Access-Control-Allow-Origin': '*'
        }
    };

    const request = axios.post(transformUrl('/signin'), querystring.stringify({ username, password }), config);

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

export function principalRequest() {
    const request = axios.get(transformUrl('/user'));

    return {
        type: PRINCIPAL_REQUEST,
        payload: request
    }
}