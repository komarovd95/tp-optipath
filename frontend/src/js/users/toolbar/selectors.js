import {createSelector} from 'reselect';
import {getSelectedUserSelector} from '../list/selectors';
import {ADMIN_ACTIONS, SELF_ACTIONS, USER_ACTIONS} from './constants';

const getLoggedUser = (state) => state.users.auth.loggedUser;

export const getEnabledActionsSelector = createSelector(getSelectedUserSelector,
    getLoggedUser, (selectedUser, loggedUser) => {
        console.log('selected', selectedUser, loggedUser);

        if (!selectedUser) {
            return ADMIN_ACTIONS;
        } else if (selectedUser.id === loggedUser.id) {
            return SELF_ACTIONS;
        } else if (selectedUser.isAdmin()) {
            return ADMIN_ACTIONS;
        } else {
            return USER_ACTIONS;
        }
    });

