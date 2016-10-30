import React from 'react';
import shortid from 'shortid';

import SidebarLink from './SidebarLink';

export default class ProfileSidebar extends React.Component {
    render() {
        const { links, tabChangeClick, currentTab, signOut } = this.props;

        return (
            <div className="col-sm-3 col-md-2 sidebar">
                {links.map(group => {
                    return (
                        <ul className="nav nav-sidebar" key={shortid.generate()}>
                            {group.map(link => {
                                const onClick = (link.tabName === 'signOut')
                                    ? signOut
                                    : tabChangeClick;

                                return (
                                    <SidebarLink tabName={link.tabName}
                                                 onClick={onClick}
                                                 currentTab={currentTab}
                                                 activeClass="active"
                                                 key={shortid.generate()}>
                                        {link.tabDisplayName}
                                    </SidebarLink>
                                )
                            })}
                        </ul>
                    )
                })}
            </div>
        )
    }
}