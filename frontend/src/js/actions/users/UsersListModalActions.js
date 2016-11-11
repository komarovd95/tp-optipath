import { createAction } from 'redux-actions';
import { createSelector } from 'reselect';

import { CallApi } from '../../util/APIUtil';

import { usersListFetch } from './UsersListFetchActions';
import * as actionTypes from '../../constants/UsersActionTypes';


const DELETE_ERROR_MESSAGE = 'Произошла ошибка при удалении пользователя. ' +
    'Повторите запрос позже';

const usersListDeleteUserRequest = createAction(actionTypes.USERS_LIST_DELETE_REQUEST);
const usersListDeleteUserSuccess = createAction(actionTypes.USERS_LIST_DELETE_SUCCESS);
const usersListDeleteUserFailure = createAction(actionTypes.USERS_LIST_DELETE_FAILURE,
    errorMessage => ({
        error: errorMessage,
        globalError: !!errorMessage
    }));

const getUsers = (state) => state.users.list.data.users;
const getSelectedIndex = (state) => state.users.list.data.selectedIndex;

const getSelectedUser = createSelector(getUsers, getSelectedIndex,
    (users, selectedIndex) => {
        if (selectedIndex === -1) {
            return null;
        } else {
            return users[selectedIndex];
        }
    });

export const usersListDeleteUser = () => (dispatch, getState) => {
    const user = getSelectedUser(getState());

    if (!user) {
        return new Promise(resolve => resolve());
    }

    dispatch(usersListDeleteUserRequest());

    return CallApi.remove(`/api/pathUsers/${user.id}`).then(response => {
        if (response.status === 204) {
            dispatch(usersListDeleteUserSuccess());

            const { data: { users }, pageable } = getState().users.list;

            if (users.length === 1) {
                const newPageable = { ...pageable };
                newPageable.number = Math.max(0, newPageable.number - 1);
                return dispatch(usersListFetch(newPageable))
            }

            return dispatch(usersListFetch())
        } else {
            dispatch(usersListDeleteUserFailure(DELETE_ERROR_MESSAGE));
            return Promise.reject(response);
        }
    }, error => {
        dispatch(usersListDeleteUserFailure(DELETE_ERROR_MESSAGE));
        return Promise.reject(error.response);
    }).then(() => {
        dispatch(usersListModalClose())
    }, () => {
        dispatch(usersListModalClose())
    })
};

export const usersListModalShow = createAction(actionTypes.USERS_LIST_MODAL_SHOW);
export const usersListModalClose = createAction(actionTypes.USERS_LIST_MODAL_CLOSE);