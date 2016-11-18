import {createAction} from 'redux-actions';
import {SIGN_IN, SIGN_OUT} from './actionTypes';
import {CallApi} from '../../util/APIUtil';
import {browserHistory} from 'react-router';
import {PathUser} from '../model';
import {STORAGE_ITEM} from '../constants';

const signInAction = createAction(SIGN_IN);
const signOutAction = createAction(SIGN_OUT);

export const signIn = () => (dispatch) => {
    if (window && window.sessionStorage) {
        const data = JSON.parse(window.sessionStorage.getItem(STORAGE_ITEM));
        console.log('item', data);
        if (data) {
            dispatch(signInAction(new PathUser(data)));
        }
    }
};

export const signOut = () => (dispatch) => {
    dispatch(signOutAction());

    browserHistory.replace('/');
    if (window && window.sessionStorage) {
        window.sessionStorage.removeItem(STORAGE_ITEM);
    }

    return CallApi.get('/signout')
};