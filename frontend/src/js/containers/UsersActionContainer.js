import { connect } from 'react-redux';

import UserListFilter from '../components/user-list/UserListFilter';
import { userDeleteModalShow } from '../actions/UserActions';

function mapStateToProps(state) {
    const { user: { actionsEnabled } } = state;

    return {
        actionsEnabled
    }
}

function mapDispatchToProps(dispatch) {
    return {
        deleteUserShow: () => dispatch(userDeleteModalShow())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserListFilter)