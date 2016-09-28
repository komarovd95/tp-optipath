import {CHANGE_TAB, NAVIGATE_TAB} from '../constants/ProfileActionTypes';

const INITIAL_STATE = {
    profileTab: 'routes'
};

export default function tabsReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case CHANGE_TAB:
            return {
                ...state,
                profileTab: action.payload
            };

        case NAVIGATE_TAB:
            console.log('payload:', action.payload);

            return {
                ...state,
                profileTab: action.payload
            };

        default:
            return state;
    }
}
