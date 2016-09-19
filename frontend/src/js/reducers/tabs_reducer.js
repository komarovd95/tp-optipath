import {CHANGE_TAB} from '../constants/profile';

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

        default:
            return state;
    }
}
