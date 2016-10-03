import * as actionTypes from '../constants/UserActionTypes';

const INITIAL_STATE = {
    isFetching: false,
    users: [],
    pageable: {
        number: 0,
        size: 2,
        sort: {
            field: 'id',
            isAscending: true
        },
        totalPages: 0,
        username: ''
    },
    actionsEnabled: []
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

        case actionTypes.USER_ENABLE_ACTIONS:
            return {
                ...state,
                actionsEnabled: action.payload
            };

        default:
            return state;
    }
}