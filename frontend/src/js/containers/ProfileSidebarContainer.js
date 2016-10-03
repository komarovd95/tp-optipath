import { connect } from 'react-redux';

import { signOut, signOutThunk } from '../actions/AuthActions';
import { changeTab } from '../actions/ProfileActions';

import ProfileSidebar from '../components/ProfileSidebar';

function mapStateToProps(state) {
    const { auth: { user }, tabs: { profileTab } } = state;
    return {
        user,
        currentTab: profileTab
    }
}

function mapDispatchToProps(dispatch) {
    return {
        tabChangeClick: tabName => dispatch(changeTab(tabName)),
        signOutUser: () => dispatch(signOutThunk())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileSidebar)