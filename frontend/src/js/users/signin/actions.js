import {createAction} from 'redux-actions';
import Qs from 'querystring';
import {SubmissionError} from 'redux-form';
import {browserHistory} from 'react-router';

import * as types from './actionTypes';
import {createGlobalErrorAction} from '../../notifications/actions';
import {CallApi} from '../../util/APIUtil';
import {RESOURCE_URL, STORAGE_ITEM} from '../constants';
import {ERROR_MESSAGE} from './constants';
import {PathUser} from '../model';

const signInRequest = createAction(types.SIGN_IN_REQUEST);
const signInSuccess = createAction(types.SIGN_IN_SUCCESS);
const signInFailure = createGlobalErrorAction(types.SIGN_IN_FAILURE);

export const signIn = (redirectUrl = '/', credentials) => (dispatch) => {
    dispatch(signInRequest());

    const config = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };

    return CallApi.post('/signin', Qs.stringify(credentials), config)
        .then(response => {
            if (response.status === 200) {
                return dispatch(fetchPrincipal(redirectUrl));
            } else {
                dispatch(signInFailure(ERROR_MESSAGE));
                return Promise.reject(response);
            }
        }, error => {
            const response = error.response;

            if (response.status === 401) {
                dispatch(signInFailure());
                throw new SubmissionError({
                    _error: 'Неверная пара логин/пароль'
                })
            } else {
                dispatch(signInFailure(ERROR_MESSAGE));
                return Promise.reject(response);
            }
        });
};

const fetchPrincipal = (redirectUrl) => (dispatch) => {
    return CallApi.get(`${RESOURCE_URL}/user`).then(response => {
        if (response.status === 200) {
            const user = new PathUser(response.data);

            if (window && window.sessionStorage) {
                window.sessionStorage.setItem(STORAGE_ITEM, JSON.stringify(user));
            }

            dispatch(signInSuccess(user));

            browserHistory.replace(redirectUrl);

            return Promise.resolve(user);
        } else {
            dispatch(signInFailure(ERROR_MESSAGE));
            return Promise.reject(response);
        }
    }, error => {
        dispatch(signInFailure(ERROR_MESSAGE));
        return Promise.reject(error.response);
    })
};