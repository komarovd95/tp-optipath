import React from 'react';

import SidebarLink from './SidebarLink';

export default class ProfileSidebar extends React.Component {
    render() {
        const { currentTab, tabChangeClick } = this.props;

        const activeClass = tabName => (tabName === currentTab) ? 'active' : '';

        return (
            <div className="col-sm-3 col-md-2 sidebar">
                <ul className="nav nav-sidebar">
                    <SidebarLink tabName="routes" className={activeClass('routes')} onClick={tabChangeClick}>
                        Мои маршруты
                    </SidebarLink>
                    <SidebarLink tabName="cars" className={activeClass('cars')} onClick={tabChangeClick}>
                        Мои автомобили
                    </SidebarLink>
                    <SidebarLink tabName="pass" className={activeClass('pass')} onClick={tabChangeClick}>
                        Сменить пароль
                    </SidebarLink>
                    <SidebarLink tabName="logout" onClick={tabChangeClick}>
                        Выйти
                    </SidebarLink>
                </ul>
            </div>
        )
    }
}