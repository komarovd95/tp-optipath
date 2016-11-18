import React from 'react';
import {connect} from 'react-redux';
import {showChangeRoleModal, showDeleteUserModal, showChangePassForm} from './actions';
import {changeFilter, fetch} from '../list/actions';
import {getEnabledActionsSelector} from './selectors';
import UsersToolbar from './components/UsersToolbar';

const mapStateToProps = (state) => ({
    filter: state.users.list.filter.username,
    actionsEnabled: getEnabledActionsSelector(state)
});

const mapDispatchToProps = (dispatch) => ({
    onFilterChange: (username) => {
        dispatch(changeFilter(username));
        dispatch(fetch())
    },
    onChangePassClick: () => dispatch(showChangePassForm()),
    onChangeRoleClick: () => dispatch(showChangeRoleModal()),
    onDeleteUserClick: () => dispatch(showDeleteUserModal())
});

export default connect(mapStateToProps, mapDispatchToProps)(UsersToolbar)
