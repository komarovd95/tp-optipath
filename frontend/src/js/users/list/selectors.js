import {createSelector} from 'reselect';
import values from 'lodash/values';
import {EMPTY_LIST} from './constants';

const getUsers = (state) => state.users.list.data.users;
const getUsersEntities = (state) => state.users.list.data.users.entities;
const getSelectedId = (state) => state.users.list.data.selectedId;

export const getUsersArraySelector = createSelector(getUsers, getUsersEntities,
    (users, entities) => users.result ? users.result.map(i => entities[i]) : EMPTY_LIST);

export const getSelectedUserSelector = createSelector(getUsersEntities, getSelectedId,
    (entities, selectedId) => entities && entities[selectedId]);

export const getUserByUsername = (state, username) =>
    values(getUsersEntities(state)).find(user => user.username === username);

export const getPersistedListState = (state) => ({
    users: {
        list: {
            pageable: state.users.list.pageable,
            filter: state.users.list.filter,
            sort: state.users.list.sort
        }
    }
});
