import { connect } from 'react-redux';

import { userEnableActions } from '../actions/UserActions'
import TableChecker from '../components/TableChecker';

function mapStateToProps(state) {
    return {
        currentId: state.user.currentId,
        userId: state.auth.user.id
    }
}

function mapDispatchToProps(dispatch) {
    return {
        enableUserActions: (id,actions) => dispatch(userEnableActions(id, actions))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TableChecker)
