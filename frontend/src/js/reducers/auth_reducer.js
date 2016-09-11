import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from '../constants/login_action_types';
import { LOGOUT_SUCCESS } from '../constants/logout_action_types';

export default function auth(state = {
        isFetching : false,
        isAuthenticated: window.localStorage.getItem('optipath-auth') ? true : false
    }, action) {
    switch (action.type) {
        case LOGIN_REQUEST:
            return Object.assign({}, state, {
                isFetching : true,
                isAuthenticated: false,
                user: action.credentials
            });

        case LOGIN_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                isAuthenticated: true,
                errorMessage: ''
            });

        case LOGIN_FAILURE:
            return Object.assing({}, state, {
                isFetching: false,
                isAuthenticated: false,
                errorMessage: action.message
            });

        case LOGOUT_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                isAuthenticated: false,
            });

        default:
            return state;
    }
}