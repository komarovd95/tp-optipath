import { LOGOUT_REQUEST, LOGOUT_SUCCESS } from '../constants/logout_action_types';

function requestLogout() {
    return {
        type: LOGOUT_REQUEST,
        isFetching: true,
        isAuthenticated: true
    }
}

function receiveLogout() {
    return {
        type: LOGOUT_SUCCESS,
        isFetching: false,
        isAuthenticated: false
    }
}

export default function logoutUser() {
    return dispatch => {
        dispatch(requestLogout());
        window.localStorage.removeItem('optipath-auth');
        dispatch(receiveLogout());
    }
}

