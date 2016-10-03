import * as actionTypes from '../constants/AuthActionTypes';

const INITIAL_STATE = {
    user: window.sessionStorage && JSON.parse(window.sessionStorage.getItem('path-user')),
    error: null,
    isAuthenticated: window.sessionStorage && !!window.sessionStorage.getItem('path-user'),
    isFetching: false
};


export default function authReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case actionTypes.SIGNIN_REQUEST:
            return {
                ...state,
                user: null,
                error: null,
                isAuthenticated: false,
                isFetching: true
            };

        case actionTypes.SIGNIN_SUCCESS:
            return {
                ...state,
                user: action.payload,
                error: null,
                isAuthenticated: true,
                isFetching: false
            };

        case actionTypes.SIGNIN_FAILURE:
            return {
                ...state,
                user: null,
                error: action.payload,
                isAuthenticated: false,
                isFetching: false
            };

        case actionTypes.PRINCIPAL_REQUEST:
            return {
                ...state,
                user: null,
                error: null,
                isAuthenticated: false,
                isFetching: true
            };

        case actionTypes.SIGNUP_REQUEST:
            return {
                ...state,
                user: null,
                error: null,
                isAuthenticated: false,
                isFetching: true
            };

        case actionTypes.SIGNUP_SUCCESS:
            return {
                ...state,
                user: null,
                error: null,
                isAuthenticated: false,
                isFetching: false
            };

        case actionTypes.SIGNUP_FAILURE:
            return {
                ...state,
                user: null,
                error: action.payload.data || action.payload.message,
                isAuthenticated: false,
                isFetching: false
            };

        case actionTypes.SIGNOUT_REQUEST:
            return {
                ...state,
                error: null,
                isAuthenticated: true,
                isFetching: true
            };

        case actionTypes.SIGNOUT_SUCCESS:
            return {
                ...state,
                user: null,
                error: null,
                isAuthenticated: false,
                isFetching: false
            };

        case actionTypes.CHECK_USERNAME_REQUEST:
            return {
                ...state,
                user: null,
                error: null,
                isAuthenticated: false,
                isFetching: true
            };

        case actionTypes.CHECK_USERNAME_ACCEPT:
            return {
                ...state,
                user: null,
                error: null,
                isAuthenticated: false,
                isFetching: false
            };

        default:
            return state;
    }
}
