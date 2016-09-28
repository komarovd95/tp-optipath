import { connect } from 'react-redux';

import UserList from '../components/UserList';
import { userList, userListReset } from '../actions/UserActions';

function mapStateToProps(state) {
    const { user } = state;

    return {
        user
    }
}

function mapDispatchToProps(dispatch) {
    return {
        requestList: (pageable) => userList(dispatch, pageable),
        reset: () => dispatch(userListReset())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserList)