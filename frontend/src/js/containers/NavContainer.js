import {connect} from 'react-redux';

import NavBar from '../components/NavBar';
import { signOut, signOutThunk } from '../actions/AuthActions';
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
        signOutUser: () => dispatch(signOutThunk()),
        navigateToTab: tabName => dispatch(navigateTab(tabName))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);