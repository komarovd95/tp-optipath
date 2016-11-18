import {connect} from 'react-redux';
import {reset, showChangePassForm, deleteUserFromProfile, makeUserAdmin} from './actions';
import {signOut} from '../auth/actions';
import {deactivateTab} from '../../profile/actions';
import UsersProfile from './components/UsersProfile';

const mapStateToProps = (state) => ({
    user: state.users.profile.user || state.users.auth.loggedUser,
    loggedUser: state.users.auth.loggedUser
});

const mapDispatchToProps = (dispatch) => ({
    signOut: () => dispatch(signOut()),
    goBack: () => dispatch(deactivateTab()),
    changePass: () => dispatch(showChangePassForm()),
    deleteUser: () => dispatch(deleteUserFromProfile()),
    changeRole: () => dispatch(makeUserAdmin()),
    reset: () => dispatch(reset())
});

export default connect(mapStateToProps, mapDispatchToProps)(UsersProfile)