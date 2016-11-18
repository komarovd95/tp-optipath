import React from 'react';
import {PathUser} from '../../users/model';

export default class NavDropdown extends React.Component {
    handleClick(tabName) {
        this.props.navigateTab(tabName);
    }

    render() {
        const {loggedUser} = this.props;

        if (!loggedUser) {
            return null;
        } else if (loggedUser.isAdmin()) {
            return (
                <ul className="dropdown-menu">
                    <li>
                        <a role="button"
                           onClick={this.handleClick.bind(this, 'routes')}>
                            Мой профиль
                        </a>
                    </li>
                    <li role="separator" className="divider" />
                    <li>
                        <a role="button"
                           onClick={this.handleClick.bind(this, 'routes')}>
                            Мои маршруты
                        </a>
                    </li>
                    <li>
                        <a role="button"
                           onClick={this.handleClick.bind(this, 'cars')}>
                            Мои автомобили
                        </a>
                    </li>
                    <li role="separator" className="divider" />
                    <li>
                        <a role="button"
                           onClick={this.handleClick.bind(this, 'usersDB')}>
                            Пользователи
                        </a>
                    </li>
                    <li>
                        <a role="button"
                           onClick={this.handleClick.bind(this, 'carsDB')}>
                            Автомобили
                        </a>
                    </li>
                    <li>
                        <a role="button"
                           onClick={this.handleClick.bind(this, 'routesDB')}>
                            Маршруты
                        </a>
                    </li>
                </ul>
            )
        } else {
            return (
                <ul className="dropdown-menu">
                    <li>
                        <a role="button"
                           onClick={this.handleClick.bind(this, 'routes')}>
                            Мой профиль
                        </a>
                    </li>
                    <li role="separator" className="divider" />
                    <li>
                        <a role="button"
                           onClick={this.handleClick.bind(this, 'routes')}>
                            Мои маршруты
                        </a>
                    </li>
                    <li>
                        <a role="button"
                           onClick={this.handleClick.bind(this, 'cars')}>
                            Мои автомобили
                        </a>
                    </li>
                </ul>
            )
        }
    }
}

NavDropdown.propTypes = {
    loggedUser: React.PropTypes.instanceOf(PathUser),
    navigateTab: React.PropTypes.func
};