import {createAction} from 'redux-actions';
import {SubmissionError} from 'redux-form';

import * as types from './actionTypes';
import {createGlobalErrorAction} from '../../notifications/actions';
import {signIn} from '../signin/actions';
import {CallApi} from '../../util/APIUtil';
import {RESOURCE_URL} from '../constants';
import {ERROR_MESSAGE, ERROR_CHECK_MESSAGE} from './constants';

const signUpRequest = createAction(types.SIGN_UP_REQUEST);
const signUpSuccess = createAction(types.SIGN_UP_SUCCESS);
const signUpFailure = createGlobalErrorAction(types.SIGN_UP_FAILURE);

export const signUp = (credentials) => (dispatch) => {
    dispatch(signUpRequest());

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    return CallApi.post(RESOURCE_URL, JSON.stringify(credentials), config)
        .then(response => {
            if (response.status === 201) {
                dispatch(signUpSuccess());
                return dispatch(signIn('/me', credentials));
            } else {
                dispatch(signUpFailure(ERROR_MESSAGE));
                return Promise.reject(response);
            }
        }, error => {
            const response = error.response;

            if (response.status === 500) {
                dispatch(signUpFailure());
                throw new SubmissionError({
                    _error: response.data.message
                });
            } else {
                dispatch(signUpFailure(ERROR_MESSAGE));
                return Promise.reject(response);
            }
        });
};

const checkUsernameRequest = createAction(types.CHECK_USERNAME_REQUEST);
const checkUsernameSuccess = createAction(types.CHECK_USERNAME_SUCCESS);
const checkUsernameFailure = createGlobalErrorAction(types.CHECK_USERNAME_FAILURE);

export const checkUsername = (username) => (dispatch) => {
    dispatch(checkUsernameRequest());

    return CallApi.get(`${RESOURCE_URL}/search/findByUsernameExists?username=${username}`)
        .then(response => {
            if (response.status === 200) {
                dispatch(checkUsernameSuccess());

                if (response.data) {
                    return Promise.reject({
                        username: [`Имя ${username} уже занято`]
                    })
                } else {
                    return Promise.resolve();
                }
            } else {
                dispatch(checkUsernameFailure(ERROR_CHECK_MESSAGE));
                return Promise.reject(response);
            }
        }, error => {
            dispatch(checkUsernameFailure(ERROR_CHECK_MESSAGE));
            return Promise.reject(error.response);
        })
};