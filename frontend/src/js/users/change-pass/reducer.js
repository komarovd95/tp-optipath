import {handleActions} from 'redux-actions';
import {RESET} from './actionTypes';

const INITIAL_STATE = {
    user: null
};


export default handleActions({
    [RESET]: (state, action) => INITIAL_STATE
}, INITIAL_STATE);