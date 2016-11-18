import {connect} from 'react-redux';
import {signOut} from '../users/auth/actions';
import {navigateTab} from '../profile/actions';

import NavBar from './components/NavBar';


const mapStateToProps = (state) => ({
    loggedUser: state.users.auth.loggedUser,
    pathname: state.routing.locationBeforeTransitions.pathname
});

const mapDispatchToProps = (dispatch) => ({
    signOut: () => dispatch(signOut()),
    navigateTab: (tabName) => dispatch(navigateTab(tabName))
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)
