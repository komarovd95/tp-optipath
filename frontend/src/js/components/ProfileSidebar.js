import React from 'react';

import SidebarLink from './SidebarLink';

export default class ProfileSidebar extends React.Component {
    render() {
        const { currentTab, tabChangeClick, signOutUser } = this.props;

        return (
            <div className="col-sm-3 col-md-2 sidebar">
                <ul className="nav nav-sidebar">
                    <SidebarLink tabName="routes" activeClass="active"
                                 currentTab={currentTab} onClick={tabChangeClick}>
                        Мои маршруты
                    </SidebarLink>
                    <SidebarLink tabName="cars" activeClass="active"
                                 currentTab={currentTab} onClick={tabChangeClick}>
                        Мои автомобили
                    </SidebarLink>
                    <SidebarLink tabName="pass" activeClass="active"
                                 currentTab={currentTab} onClick={tabChangeClick}>
                        Сменить пароль
                    </SidebarLink>
                    <SidebarLink tabName="logout" onClick={signOutUser}>
                        Выйти
                    </SidebarLink>
                </ul>
            </div>
        )
    }
}