import {connect} from 'react-redux';

import {changeTab} from '../actions/profile_actions';

import ProfileSidebar from '../components/profile_sidebar';

function mapStateToProps(state) {
    const { profileTab } = state.tabs;
    return {
        currentTab: profileTab
    }
}

function mapDispatchToProps(dispatch) {
    return {
        tabChangeClick: tabName => dispatch(changeTab(tabName))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileSidebar)