import React from 'react';

import SidebarLink from './SidebarLink';

export default class ProfileSidebar extends React.Component {
    render() {
        const { currentTab, tabChangeClick } = this.props;

        console.log(this.props);

        return (
            <div className="col-sm-3 col-md-2 sidebar">
                <ul className="nav nav-sidebar">
                    <SidebarLink tabName="routes" currentTab={currentTab} onClick={tabChangeClick}>
                        Мои маршруты
                    </SidebarLink>
                    <SidebarLink tabName="cars" currentTab={currentTab} onClick={tabChangeClick}>
                        Мои автомобили
                    </SidebarLink>
                </ul>
            </div>
        )
    }
}