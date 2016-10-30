import * as actionTypes from '../constants/UserActionTypes';

const INITIAL_STATE = {
    isFetching: false,
    users: [],
    pageable: {
        number: 0,
        size: 20,
        sort: {
            field: 'id',
            isAscending: false
        },
        totalPages: 0,
        username: ''
    },
    selectedUser: null,
    actionsEnabled: [],
    deleteUserIsShown: false
};

export default function userReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case actionTypes.USER_LIST_REQUEST:
            return {
                ...state,
                isFetching: true,
                selectedUser: null,
                actionsEnabled: []
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
                selectedUser: action.payload.selectedUser,
                actionsEnabled: action.payload.actions
            };

        case actionTypes.USER_DELETE_SHOW:
            return {
                ...state,
                deleteUserIsShown: true
            };

        case actionTypes.USER_DELETE_CLOSE:
            return {
                ...state,
                deleteUserIsShown: false,
                isFetching: false
            };

        case actionTypes.USER_DELETE_REQUEST:
            return {
                ...state,
                isFetching: true,
            };

        case actionTypes.USER_DELETE_SUCCESS:
            return {
                ...state,
                deleteUserIsShown: false,
                isFetching: false
            };

        case actionTypes.USER_DELETE_FAILURE:
            return {
                ...state,
                deleteUserIsShown: false,
                isFetching: false
            };

        default:
            return state;
    }
}