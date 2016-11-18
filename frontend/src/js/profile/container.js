import {connect} from 'react-redux';
import Profile from './components/Profile';
import {changeTab} from './actions';
import {signOut} from '../users/auth/actions';

const mapStateToProps = (state) => ({
    loggedUser: state.users.auth.loggedUser,
    activeTab: state.profile.activeTab
});

const mapDispatchToProps = (dispatch) => ({
    changeTab: (tabName) => dispatch(changeTab(tabName)),
    signOut: () => dispatch(signOut())
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile)