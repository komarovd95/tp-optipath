import {createAction} from 'redux-actions';
import * as types from './actionTypes';
import {SUCCESS_MESSAGE, ERROR_MESSAGE} from './constants';
import {RESOURCE_URL} from '../constants';
import {CallApi} from '../../util/APIUtil';
import {
    createGlobalInfoAction, createGlobalErrorAction
} from '../../notifications/actions';
import {deactivateTab} from '../../profile/actions';


const changePassRequest = createAction(types.CHANGE_REQUEST);
const changePassSuccess = createGlobalInfoAction(types.CHANGE_SUCCESS);
const changePassFailure = createGlobalErrorAction(types.CHANGE_FAILURE);

export const changePass = ({pass}) => (dispatch, getState) => {
    const user = getState().users.changePass.user
        || getState().users.auth.loggedUser;

    dispatch(changePassRequest());

    const requestData = {
        password: pass
    };

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    return CallApi.patch(`${RESOURCE_URL}/${user.id}`,
        JSON.stringify(requestData), config).then(response => {
            dispatch(deactivateTab());

            if (response.status === 200) {
                dispatch(changePassSuccess(SUCCESS_MESSAGE));
                return Promise.resolve();
            } else {
                dispatch(changePassFailure(ERROR_MESSAGE));
                return Promise.reject(response);
            }
    }, error => {
        dispatch(changePassFailure(ERROR_MESSAGE));
        return Promise.reject(error.response);
    })
};

export const reset = createAction(types.RESET);