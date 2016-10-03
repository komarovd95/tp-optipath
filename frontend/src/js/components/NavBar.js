import React from 'react';
import {Link} from 'react-router';

import NavLink from './NavLink';
import ProfileLink from './ProfileLink';

export default class NavBar extends React.Component {
    render() {
        const {
            isAuthenticated, user, pathname, signOutUser, navigateToTab
        } = this.props;

        const isAdmin = isAuthenticated && user.roles.find(r => r === 'ROLE_ADMIN');

        return (
            <nav className="navbar navbar-inverse navbar-fixed-top">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <Link to="/" className="navbar-brand">OptiPath</Link>
                        <button type="button" className="navbar-toggle collapsed"
                                data-toggle="collapse" data-target="#nav-collapsed">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar" />
                            <span className="icon-bar" />
                            <span className="icon-bar" />
                        </button>
                    </div>
                    <div className="collapse navbar-collapse" id="nav-collapsed">
                        <ul className="nav navbar-nav">
                            <NavLink to="/route" activeClassName="active">
                                <span className="glyphicon glyphicon-road"/> Новый маршрут
                            </NavLink>
                            <NavLink to="/about" activeClassName="active">
                                <span className="glyphicon glyphicon-info-sign"/> О программе
                            </NavLink>
                            <NavLink to="/faq" activeClassName="active">
                                <span className="glyphicon glyphicon-question-sign"/> FAQ
                            </NavLink>
                        </ul>

                        { isAuthenticated === false
                            ? (
                                <ul className="nav navbar-nav navbar-right">
                                    {pathname !== '/signin' &&
                                        <li><Link to="/signin">Войти</Link></li>
                                    }
                                    <li>
                                        <p className="navbar-btn" style={{margin: "8px 15px"}}>
                                            <Link to="/signup" className="btn btn-success">
                                                Регистрация
                                            </Link>
                                        </p>
                                    </li>
                                </ul>
                            )
                            : (
                                <ul className="nav navbar-nav navbar-right">
                                    <li className="dropdown">
                                        <a href="#" className="dropdown-toggle"
                                           data-toggle="dropdown" role="button"
                                           aria-haspopup="true" aria-expanded="false">
                                            <span className="glyphicon glyphicon-user"
                                                  style={{marginRight: "10px"}}/>
                                            {user.username} <span className="caret" />
                                        </a>
                                        <ul className="dropdown-menu">
                                            <li>
                                                <Link to="/me">
                                                    Мой профиль
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="/routes">
                                                    Мои маршруты
                                                </Link>
                                            </li>
                                        </ul>
                                        { isAdmin
                                            ? adminDropDown(navigateToTab)
                                            : userDropDown(navigateToTab)
                                        }
                                    </li>
                                    <li>
                                        <a role="button" onClick={signOutUser}>
                                            Выйти
                                        </a>
                                    </li>
                                </ul>
                            )
                        }
                    </div>
                </div>
            </nav>
        )
    }
}

const adminDropDown = (navClick) => {
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
                <ProfileLink tabName="users" onClick={navClick}>
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
};

const userDropDown = (navClick) => {
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
};
