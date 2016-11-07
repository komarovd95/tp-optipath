import { browserHistory } from 'react-router';

import { CHANGE_TAB, NAVIGATE_TAB, TRANSIT_STATE } from '../constants/ProfileActionTypes';

export function changeTab(tabName) {
    return {
        type: CHANGE_TAB,
        payload: tabName
    }
}

export function navigateTab(tabName) {
    browserHistory.push('/me');

    return {
        type: NAVIGATE_TAB,
        payload: tabName
    }
}