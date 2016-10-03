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
    currentId: null,
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
                },
                currentId: null,
                actionsEnabled: []
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
                currentId: action.payload.id,
                actionsEnabled: action.payload.actions
            };

        default:
            return state;
    }
}