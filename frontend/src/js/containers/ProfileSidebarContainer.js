import { connect } from 'react-redux';

import { signOut } from '../actions/AuthActions';
import { changeTab } from '../actions/ProfileActions';

import ProfileSidebar from '../components/profile/ProfileSidebar';

function filterLinks(user, links) {
    return user.roles.includes('ROLE_ADMIN') ? links : [links[0], links[1], links[3]];
}

function mapStateToProps(state, ownProps) {
    const { auth: { user }, tabs: { profileTab } } = state;

    return {
        user,
        links: filterLinks(user, ownProps.links),
        currentTab: profileTab
    }
}

function mapDispatchToProps(dispatch) {
    return {
        tabChangeClick: (tabName) => dispatch(changeTab(tabName)),
        signOut: () => dispatch(signOut())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileSidebar)