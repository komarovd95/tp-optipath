import {handleActions} from 'redux-actions';
import {SHOW, CLOSE} from './actionTypes';

const INITIAL_STATE = {
    isOpen: false,
    modalInfo: null
};

export default handleActions({
    [SHOW]: (state, action) => ({
        ...state,
        isOpen: true,
        modalInfo: action.payload
    }),

    [CLOSE]: (state, action) => INITIAL_STATE
}, INITIAL_STATE)