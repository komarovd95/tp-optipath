import {connect} from 'react-redux';

import NavBar from '../components/NavBar';
import { signOut } from '../actions/AuthActions';
import { navigateTab } from '../actions/ProfileActions';

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
        signOutUser: () => signOut(dispatch),
        navigateToTab: tabName => dispatch(navigateTab(tabName))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);