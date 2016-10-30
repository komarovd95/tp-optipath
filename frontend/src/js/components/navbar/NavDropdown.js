import React from 'react';

import ProfileLink from '../profile/ProfileLink';

export default class NavDropdown extends React.Component {
    render() {
        const { roles, navClick } = this.props;

        if (roles.includes('ROLE_ADMIN')) {
            return (
                <ul className="dropdown-menu">
                    <li>
                        <ProfileLink tabName="routes" onClick={navClick}>
                            Мой профиль
                        </ProfileLink>
                    </li>
                    <li role="separator" className="divider" />
                    <li>
                        <ProfileLink tabName="routes" onClick={navClick}>
                            Мои маршруты
                        </ProfileLink>
                    </li>
                    <li>
                        <ProfileLink tabName="cars" onClick={navClick}>
                            Мои автомобили
                        </ProfileLink>
                    </li>
                    <li role="separator" className="divider" />
                    <li>
                        <ProfileLink tabName="usersDB" onClick={navClick}>
                            Пользователи
                        </ProfileLink>
                    </li>
                    <li>
                        <ProfileLink tabName="carsDB" onClick={navClick}>
                            Автомобили
                        </ProfileLink>
                    </li>
                    <li>
                        <ProfileLink tabName="routesDB" onClick={navClick}>
                            Маршруты
                        </ProfileLink>
                    </li>
                </ul>
            )
        } else {
            return (
                <ul className="dropdown-menu">
                    <li>
                        <ProfileLink tabName="routes" onClick={navClick}>
                            Мой профиль
                        </ProfileLink>
                    </li>
                    <li role="separator" className="divider" />
                    <li>
                        <ProfileLink tabName="routes" onClick={navClick}>
                            Мои маршруты
                        </ProfileLink>
                    </li>
                    <li>
                        <ProfileLink tabName="cars" onClick={navClick}>
                            Мои автомобили
                        </ProfileLink>
                    </li>
                </ul>
            )
        }
    }
}

NavDropdown.propTypes = {
    roles: React.PropTypes.array.isRequired,
    navClick: React.PropTypes.func.isRequired
};