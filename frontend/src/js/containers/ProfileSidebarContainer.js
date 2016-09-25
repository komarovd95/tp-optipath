import { connect } from 'react-redux';

import { signOut } from '../actions/AuthActions';
import { changeTab } from '../actions/ProfileActions';

import ProfileSidebar from '../components/ProfileSidebar';

function mapStateToProps(state) {
    const { profileTab } = state.tabs;
    return {
        currentTab: profileTab
    }
}

function mapDispatchToProps(dispatch) {
    return {
        tabChangeClick: tabName => dispatch(changeTab(tabName)),
        signOutUser: () => signOut(dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileSidebar)