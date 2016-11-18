import {handleActions} from 'redux-actions';
import {SIGN_IN, SIGN_OUT} from './actionTypes';
import {SIGN_IN_SUCCESS} from '../signin/actionTypes';

const INITIAL_STATE = {
    loggedUser: null
};

export default handleActions({
    [SIGN_IN_SUCCESS]: (state, action) => ({
        ...state,
        loggedUser: action.payload
    }),

    [SIGN_IN]: (state, action) => ({
        ...state,
        loggedUser: action.payload
    }),

    [SIGN_OUT]: (state, action) => ({
        ...state,
        loggedUser: null
    })
}, INITIAL_STATE)
