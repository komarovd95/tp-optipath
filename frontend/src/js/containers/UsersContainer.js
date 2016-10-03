import { connect } from 'react-redux';

import UserList from '../components/UserList';
import { userList, userListThunk, userListReset, userEnableActions } from '../actions/UserActions';

function mapStateToProps(state) {
    const { auth, user } = state;

    return {
        auth,
        user
    }
}

function mapDispatchToProps(dispatch) {
    return {
        requestList: (pageable) => dispatch(userListThunk(pageable)),
        reset: () => dispatch(userListReset()),
        enableUserActions: (actions) => dispatch(userEnableActions(actions))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserList)