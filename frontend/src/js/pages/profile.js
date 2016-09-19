import React from 'react';

import ProfileContainer from '../containers/profile_container';
import ProfileSidebarContainer from '../containers/profile_sidebar_container';
import ProfileTab from '../components/profile_tab';

export default class ProfilePage extends React.Component {
    render() {
        return (
            <div className="container-fluid react-animation">
                <div className="row">
                    <ProfileSidebarContainer />
                    <ProfileContainer>
                        <ProfileTab tabName="routes">
                            <p>Hello</p>
                        </ProfileTab>
                        <ProfileTab tabName="cars">
                            <p>Halo</p>
                        </ProfileTab>
                    </ProfileContainer>
                </div>
            </div>
        )
    }
}
