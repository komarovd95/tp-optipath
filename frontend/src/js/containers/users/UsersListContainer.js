import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import {
    usersListFetch, usersListReset, usersListRowSelect
} from '../../actions/users/UsersListFetchActions';

import {
    usersListDeleteUser, usersListModalClose
} from '../../actions/users/UsersListModalActions';

import UsersList from '../../components/users/list/UsersList';


const rolesToString = (roles) => {
    return roles.includes('ROLE_ADMIN') ? 'Администратор' : 'Пользователь';
};

const getUsers = (state) => state.users.list.data.users;

const getUsersSelector = createSelector(getUsers, (users) => {
    return users.map(u => ({
        id: u.id,
        username: u.username,
        updatedAt: new Date(u.updatedAt).toLocaleString('ru'),
        roles: rolesToString(u.roles)
    }));
});

const mapStateToProps = (state) => {
    const { data, pageable, filter, modal, sort } = state.users.list;

    return {
        ...data,
        users: getUsersSelector(state),
        pageable: {
            ...pageable
        },
        filter: {
            ...filter
        },
        sort: {
            ...sort
        },
        modalIsShown: modal.isShown
    }
};

const mapDispatchToProps = (dispatch) => ({
    requestData: (p, s, f) => dispatch(usersListFetch(p, s, f)),
    resetData: () => dispatch(usersListReset()),
    selectRow: (index) => dispatch(usersListRowSelect(index)),
    modalAccept: () => dispatch(usersListDeleteUser()),
    modalClose: () => dispatch(usersListModalClose())
});

export default connect(mapStateToProps, mapDispatchToProps)(UsersList)
