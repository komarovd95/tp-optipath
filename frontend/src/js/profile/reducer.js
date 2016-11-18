import {handleActions} from 'redux-actions';
import {CHANGE_TAB, ACTIVATE_TAB, PASSIVATE_TAB} from './actionTypes';

const INITIAL_STATE = {
    activeTab: 'profile',
    prevTab: '',
    persistedState: {}
};

export default handleActions({
    [CHANGE_TAB]: (state, action) => ({
        ...state,
        activeTab: action.payload
    }),

    [ACTIVATE_TAB]: (state, action) => {
        const persistedState = {...state.persistedState};
        delete persistedState[action.payload.tabName];

        return {
            ...state,
            persistedState
        }
    },

    [PASSIVATE_TAB]: (state, action) => {
        const persistedState = {...state.persistedState};
        persistedState[action.payload.tabName] = action.payload.state;

        return {
            ...state,
            persistedState,
            prevTab: action.payload.tabName
        }
    }
}, INITIAL_STATE)