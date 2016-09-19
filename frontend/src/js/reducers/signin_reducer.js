import { SIGNIN_REQUEST, SIGNIN_SUCCESS, SIGNIN_FAILURE, PRINCIPAL_REQUEST } from '../constants/signin';

const INITIAL_STATE = {
    user: JSON.parse(window.sessionStorage.getItem('path-user')),
    error: null,
    isAuthenticated: !!window.sessionStorage.getItem('path-user'),
    isFetching: false
};

export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
        case SIGNIN_REQUEST:
            return {
                ...state,
                user: null,
                error: null,
                isAuthenticated: false,
                isFetching: true
            };

        case SIGNIN_SUCCESS:
            return {
                ...state,
                user: action.payload,
                error: null,
                isAuthenticated: true,
                isFetching: false
            };

        case SIGNIN_FAILURE:
            return {
                ...state,
                user: null,
                error: action.payload.data || action.payload.message,
                isAuthenticated: false,
                isFetching: false
            };

        case PRINCIPAL_REQUEST:
            return {
                ...state,
                user: null,
                error: null,
                isAuthenticated: false,
                isFetching: true
            };

        default:
            return state;
    }
}
