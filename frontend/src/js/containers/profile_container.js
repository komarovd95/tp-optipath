import { connect } from 'react-redux';

import Profile from '../components/Profile';

function mapStateToProps(state) {
    const { auth : { user }, tabs: { profileTab } } = state;
    return {
        user,
        currentTab: profileTab
    }
}

export default connect(mapStateToProps)(Profile)
