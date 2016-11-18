import {RESET} from './actionTypes';

const INITIAL_STATE = {
    message: '',
    level: '',
    isActive: false
};

export default function(state, action) {
    if (action.type === RESET) {
        return INITIAL_STATE;
    } else if (action.global) {
        return {
            ...state,
            isActive: true,
            message: action.payload,
            level: action.globalLevel
        }
    } else {
        return state || INITIAL_STATE;
    }
}
