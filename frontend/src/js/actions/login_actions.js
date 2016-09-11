import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from '../constants/login_action_types';

function requestLogin(credentials) {
    return {
        type: LOGIN_REQUEST,
        isFetching: true,
        isAuthenticated: false,
        credentials
    }
}

function receiveLogin(user) {
    return {
        type: LOGIN_SUCCESS,
        isFetching: false,
        isAuthenticated: true,
        user
    }
}

function failureLogin(message) {
    return {
        type: LOGIN_FAILURE,
        isFetching: false,
        isAuthenticated: false,
        message
    }
}

export default function loginUser(credentials) {
    const config = {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/x-www-form-urlencoded',
            'Basic' : window.btoa(credentials.login + ':' + credentials.password)
        }
    };

    return dispatch => {
        dispatch(requestLogin(credentials));

        return window.fetch('/api/login', config)
            .then(response => {
                response.json().then(user => ({ user, response }))
            })
            .then(({ user, response }) => {
                if (!response.ok) {
                    dispatch(failureLogin(user.message));
                    return Promise.reject(user);
                } else {
                    window.localStorage.setItem('optipath-auth', new Date());
                    dispatch(receiveLogin(user));
                }
            }).catch(err => console.log("Error: " + err));
    }
}


