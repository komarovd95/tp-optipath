import * as actionTypes from '../constants/UserActionTypes';

const INITIAL_STATE = {
    isFetching: false,
    users: null,
    pageable: {
        number: 0,
        size: 50,
        totalPages: undefined
    }
};

export default function userReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case actionTypes.USER_LIST_REQUEST:
            return {
                ...state,
                isFetching: true
            };

        case actionTypes.USER_LIST_SUCCESS:
            return {
                ...state,
                isFetching: false,
                users: action.payload.data,
                pageable: {
                    ...state.pageable,
                    ...action.payload.pageable
                }
            };

        case actionTypes.USER_LIST_FAILURE:
            return {
                ...state,
                isFetching: false
            };

        case actionTypes.USER_LIST_RESET:
            return INITIAL_STATE;

        default:
            return state;
    }
}