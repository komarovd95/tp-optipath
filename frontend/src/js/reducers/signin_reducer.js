import { SIGNIN_REQUEST, SIGNIN_SUCCESS, SIGNIN_FAILURE } from '../constants/signin';

const INITIAL_STATE = {
    user: null,
    error: null,
    isAuthenticated: false,
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
                user: action.payload.data.user,
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

        default:
            return state;
    }
}
