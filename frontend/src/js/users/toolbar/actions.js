import React from 'react';
import {deleteUser, changeRole} from '../list/actions';
import {activateTab} from '../../profile/actions';
import {showModal} from '../../modal/actions';
import {getSelectedUserSelector, getPersistedListState} from '../list/selectors';

export const showDeleteUserModal = () => (dispatch, getState) => {
    const user = getSelectedUserSelector(getState());

    dispatch(showModal({
        title: 'Удалить пользователя',
        message: (
            <p>Вы действительно желаете удалить пользователя
                <b> {user.username}</b>?
            </p>
        ),
        accept: () => dispatch(deleteUser())
    }))
};

export const showChangeRoleModal = () => (dispatch, getState) => {
    const user = getSelectedUserSelector(getState());

    dispatch(showModal({
        title: 'Сделать администратором',
        message: (
            <p>Вы действительно желаете сделать пользователя
                <b> {user.username}</b> администратором?
            </p>
        ),
        accept: () => dispatch(changeRole())
    }))
};

export const showChangePassForm = () => (dispatch, getState) => {
    const user = getSelectedUserSelector(getState());

    dispatch(activateTab('changePass', getPersistedListState, {
        users: {
            changePass: {
                user
            }
        }
    }))
};
