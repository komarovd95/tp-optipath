import React from 'react';
import shortid from 'shortid';
import {PathUser} from '../../users/model';
import flatten from 'lodash/flatten';

import Animation from '../../components/common/Animation';
import ProfileTab from './ProfileTab';


export default class Profile extends React.Component {
    constructor() {
        super();
        this.createSideBar = this.createSideBar.bind(this);
        this.createActiveTab = this.createActiveTab.bind(this);
    }

    createSideBar() {
        const {activeTab, loggedUser, changeTab, signOut, children} = this.props;

        return children.map(child => React.cloneElement(child, {
                key: shortid.generate(),
                loggedUser,
                activeTab,
                changeTab,
                signOut
            })
        );
    }

    createActiveTab() {
        const {children, activeTab} = this.props;

        const tabs = flatten(children.map(child => child.props.children));
        const activeTabView = tabs.find(tab => tab.props.name === activeTab);

        if (activeTabView) {
            const {getComponent, displayName} = activeTabView.props;

            if (getComponent) {
                return (
                    <ProfileTab key={shortid.generate()}
                                tabDisplayName={displayName}>
                        {getComponent()}
                    </ProfileTab>
                )
            }
        }

        return null;
    }

    render() {
        const sideBar = this.createSideBar();
        const activeTab = this.createActiveTab();

        return (
            <div className="row react-animation">
                <div className="col-sm-3 col-md-2 sidebar">
                    {sideBar}
                </div>
                <div className="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 profile-content">
                    <Animation>
                        {activeTab}
                    </Animation>
                </div>
            </div>
        )
    }
}

Profile.propTypes = {
    loggedUser: React.PropTypes.instanceOf(PathUser).isRequired,
    activeTab: React.PropTypes.string.isRequired,
    changeTab: React.PropTypes.func.isRequired,
    signOut: React.PropTypes.func.isRequired
};