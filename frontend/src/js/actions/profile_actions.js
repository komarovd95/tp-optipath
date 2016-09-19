import {CHANGE_TAB} from '../constants/profile';

export function changeTab(tabName) {
    return {
        type: CHANGE_TAB,
        payload: tabName
    }
}