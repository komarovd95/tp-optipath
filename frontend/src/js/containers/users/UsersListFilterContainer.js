import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { usersListFetch } from '../../actions/users/UsersListFetchActions';
import { usersListModalShow } from '../../actions/users/UsersListModalActions';

import UsersListFilter from '../../components/users/list/UsersListFilter';


const getUsers = (state) => state.users.list.data.users;
const getSelectedIndex = (state) => state.users.list.data.selectedIndex;
const getLoggedUserId = (state) => state.auth.user.id;

const getActionsSelector = createSelector(getUsers, getSelectedIndex, getLoggedUserId,
    (users, selectedIndex, loggedUserId) => {
        const selectedUser = (selectedIndex === -1) ? null : users[selectedIndex];

        if (!selectedUser) {
            return [];
        } else if (selectedUser.id === loggedUserId) {
            return ['changePass'];
        } else if (selectedUser.roles !== 'Администратор') {
            return ['changePass', 'changeRole', 'delete'];
        } else {
            return [];
        }
    });

const mapStateToProps = (state) => ({
    actionsEnabled: getActionsSelector(state)
});

const mapDispatchToProps = (dispatch) => ({
    onFilterChange: (filter) => dispatch(usersListFetch(null, null, filter)),
    onDeleteClick: () => dispatch(usersListModalShow())
});

export default connect(mapStateToProps, mapDispatchToProps)(UsersListFilter)
