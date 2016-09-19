import { connect } from 'react-redux';

import Profile from '../components/profile';

function mapStateToProps(state) {
    const { signIn : { user }, tabs: { profileTab } } = state;
    return {
        user,
        currentTab: profileTab
    }
}

export default connect(mapStateToProps)(Profile)
