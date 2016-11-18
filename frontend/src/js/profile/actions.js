import {createAction} from 'redux-actions';
import {browserHistory} from 'react-router';
import {CHANGE_TAB, ACTIVATE_TAB, PASSIVATE_TAB} from './actionTypes';

export const changeTab = createAction(CHANGE_TAB);

export const navigateTab = (tabName) => {
    browserHistory.push('/me');
    return changeTab(tabName);
};

const activateState = createAction(ACTIVATE_TAB);
const passivateState = createAction(PASSIVATE_TAB);

export const activateTab = (tabName, stateSelector, data) =>
    (dispatch, getState) => {
        const {activeTab, persistedState} = getState().profile;

        if (activeTab && stateSelector) {
            dispatch(passivateState({
                tabName: activeTab,
                state: stateSelector(getState())
            }));
        }

        if (data) {
            dispatch(activateState({
                tabName,
                state: data
            }))
        } else if (persistedState && persistedState[tabName]) {
            dispatch(activateState({
                tabName,
                state: persistedState[tabName]
            }));
        }

        dispatch(changeTab(tabName));
    };

export const deactivateTab = () => (dispatch, getState) => {
    const {prevTab, persistedState} = getState().profile;

    if (prevTab && persistedState && persistedState[prevTab]) {
        dispatch(activateState({
            tabName: prevTab,
            state: persistedState[prevTab]
        }))
    }

    dispatch(changeTab(prevTab || 'profile'))
};