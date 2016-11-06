import { connect } from 'react-redux';

import UserList from '../components/user-list/UserList';
import {
    userList, userListReset, userEnableActions, userDeleteModalClose, userDelete,
    userDeleteModalShow
} from '../actions/UserActions';

function mapStateToProps(state) {
    const {
        auth : { user : loggedUser },
        user : {
            users, selectedUser, isFetching, pageable, filter, deleteUserIsShown,
            actionsEnabled
        }
    } = state;

    return {
        users,
        selectedUser,
        loggedUser,
        isFetching,
        pageable,
        filter,
        deleteUserIsShown,
        actionsEnabled
    }
}

function mapDispatchToProps(dispatch) {
    return {
        requestData: (pageable, filter) => dispatch(userList(pageable, filter)),
        resetList: () => dispatch(userListReset()),
        enableActions: (id, actions) => dispatch(userEnableActions(id, actions)),
        modalAccept: (pageable, user) => dispatch(userDelete(pageable, user)),
        modalClose: () => dispatch(userDeleteModalClose()),
        onDeleteClick: () => dispatch(userDeleteModalShow())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserList)