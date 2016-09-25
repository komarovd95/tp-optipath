import {connect} from 'react-redux';

import {changeTab} from '../actions/ProfileActions';

import ProfileSidebar from '../components/ProfileSidebar';

function mapStateToProps(state) {
    const {profileTab} = state.tabs;
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