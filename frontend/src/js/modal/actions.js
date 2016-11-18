import {createAction} from 'redux-actions';
import {SHOW, CLOSE} from './actionTypes';

export const showModal = createAction(SHOW);
export const closeModal = createAction(CLOSE);