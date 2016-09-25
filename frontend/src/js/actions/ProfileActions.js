import {CHANGE_TAB} from '../constants/ProfileActionTypes';

export function changeTab(tabName) {
    return {
        type: CHANGE_TAB,
        payload: tabName
    }
}