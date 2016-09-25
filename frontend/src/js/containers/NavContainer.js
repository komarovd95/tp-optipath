import {connect} from 'react-redux';

import NavBar from '../components/NavBar';
import { signOut } from '../actions/AuthActions';

function mapStateToProps(state) {
    const {
        auth: { user, isAuthenticated },
        routing: { locationBeforeTransitions: { pathname } }
    } = state;

    return {
        isAuthenticated,
        user,
        pathname
    }
}

function mapDispatchToProps(dispatch) {
    return {
        signOutUser: () => signOut(dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);