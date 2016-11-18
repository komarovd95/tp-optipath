import {handleActions} from 'redux-actions';
import {RESET, RELOAD} from './actionTypes';

const INITIAL_STATE = {
    user: null
};

export default handleActions({
    [RESET]: (state, action) => INITIAL_STATE,
    [RELOAD]: (state, action) => ({
        ...state,
        user: action.payload
    })
}, INITIAL_STATE);