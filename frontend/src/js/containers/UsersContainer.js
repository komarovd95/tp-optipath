import { connect } from 'react-redux';

import UserList from '../components/user-list/UserList';
import { userList, userListReset, userEnableActions, userDeleteModalClose, userDelete } from '../actions/UserActions';

function mapStateToProps(state) {
    const { auth, user } = state;

    return {
        auth,
        user
    }
}

function mapDispatchToProps(dispatch) {
    return {
        requestList: (pageable) => dispatch(userList(pageable)),
        reset: () => dispatch(userListReset()),
        enableUserActions: (id, actions) => dispatch(userEnableActions(id, actions)),
        modalClose: () => dispatch(userDeleteModalClose()),
        modalAccept: (pageable, userId) => dispatch(userDelete(pageable, userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserList)