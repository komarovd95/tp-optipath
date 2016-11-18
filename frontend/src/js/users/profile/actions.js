import {createAction} from 'redux-actions';
import {RESET, RELOAD} from './actionTypes';
import {CallApi} from '../../util/APIUtil';
import {activateTab, deactivateTab} from '../../profile/actions';
import {deleteUser, changeRole} from '../list/actions';
import {PathUser} from "../model";

export const reset = createAction(RESET);

export const showChangePassForm = () => (dispatch, getState) => {
    const user = getState().users.profile.user;

    dispatch(activateTab('changePass', null, {
        users: {
            changePass: {
                user
            }
        }
    }))
};

export const deleteUserFromProfile = () => (dispatch, getState) => {
    const user = getState().users.profile.user;

    return dispatch(deleteUser(user)).then(() => {
        dispatch(deactivateTab())
    })
};

const reloadUser = createAction(RELOAD);

export const makeUserAdmin = () => (dispatch, getState) => {
    const user = getState().users.profile.user;

    return dispatch(changeRole(user)).then(() => {
        return CallApi.get('/api/users/' + user.id).then(response => {
           dispatch(reloadUser(new PathUser(response.data)));
        })
    })
};