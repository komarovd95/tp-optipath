import {createAction} from 'redux-actions';
import {RESET} from './actionTypes';
import {INFO, WARN, ERROR} from './constants';

export const createGlobalInfoAction = actionType => payload => ({
    type: actionType,
    payload: payload,
    global: !!payload,
    globalLevel: INFO
});

export const createGlobalWarnAction = actionType => payload => ({
    type: actionType,
    payload: payload,
    global: !!payload,
    globalLevel: WARN
});

export const createGlobalErrorAction = actionType => payload => ({
    type: actionType,
    payload: payload,
    global: !!payload,
    globalLevel: ERROR
});

export const resetNotification = createAction(RESET);