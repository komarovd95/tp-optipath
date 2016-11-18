import React from 'react';
import shortid from 'shortid';
import {PathUser} from '../../users/model';

export default class ProfileLinkGroup extends React.Component {
    render() {
        const {loggedUser, adminOnly, activeTab, changeTab, signOut} = this.props;

        if (!adminOnly || loggedUser.isAdmin()) {
            const children = Array.isArray(this.props.children)
                ? this.props.children
                : [this.props.children];

            const links = children.map(child => React.cloneElement(child, {
                key: shortid.generate(),
                activeTab,
                changeTab,
                signOut
            }));

            return (
                <ul className="nav nav-sidebar">
                    {links}
                </ul>
            )
        } else {
            return null;
        }
    }
}

ProfileLinkGroup.propTypes = {
    loggedUser: React.PropTypes.instanceOf(PathUser),
    adminOnly: React.PropTypes.bool,
    activeTab: React.PropTypes.string,
    changeTab: React.PropTypes.func,
    signOut: React.PropTypes.func
};

ProfileLinkGroup.defaultProps = {
    adminOnly: false
};