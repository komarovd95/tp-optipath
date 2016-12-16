import {createAction} from 'redux-actions';
import Qs from 'querystring';
import {SIGN_IN, SIGN_OUT} from './actionTypes';
import {CallApi} from '../../util/APIUtil';
import {browserHistory} from 'react-router';
import {PathUser} from '../model';
import {STORAGE_ITEM} from '../constants';

import {getLoggedUser} from '../actions';


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

const saveUserInStorage = (user) => () => new Promise(resolve => {
    if (window && window.sessionStorage) {
        window.sessionStorage.setItem(STORAGE_ITEM, JSON.stringify(user));
    }
    resolve(user);
});


const newSignIn = (redirectUrl = '/', {username, password}) => (dispatch) => {
    if (window && window.sessionStorage) {
        const item = window.sessionStorage.getItem(STORAGE_ITEM);

        if (item) {
            return new Promise(resolve => {
                const user = new PathUser(item);
                dispatch('SIGN_IN_SUCCESS', user);
                resolve(user);
            })
        }
    }


    dispatch('SIGN_IN_REQUEST');

    const config = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };

    return CallApi.post('/signin', Qs.stringify({username, password}), config)
        .then(response => {
            if (response.status === 200) {
                return dispatch(getLoggedUser())
            } else {
                dispatch('SIGN_IN_FAILURE');
                return Promise.reject(response);
            }
        }, error => {
            dispatch('SIGN_IN_FAILURE');
            return Promise.reject(error.response);
        })
        .then(loggedUser => {
            dispatch('SIGN_IN_SUCCESS', loggedUser);
            return saveUserInStorage(loggedUser);
        }, error => {
            dispatch('SIGN_IN_FAILURE');
            return Promise.reject(error);
        })
};

