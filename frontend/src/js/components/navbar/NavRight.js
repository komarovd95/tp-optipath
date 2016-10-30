import React from 'react';
import { Link } from 'react-router';

import NavDropdown from './NavDropdown';

export default class NavRight extends React.Component {
    render() {
        const { isAuthenticated, user, pathname, signOut, navClick } = this.props;

        if (!isAuthenticated) {
            return (
                <ul className="nav navbar-nav navbar-right">
                    { pathname !== '/signin'
                            && <li><Link to="/signin">Войти</Link></li>
                    }
                    <li>
                        <p className="navbar-btn" style={{margin: "8px 15px"}}>
                            <Link to="/signup" className="btn btn-success"
                                  role="button">
                                Регистрация
                            </Link>
                        </p>
                    </li>
                </ul>
            )
        } else {
            return (
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
                        <NavDropdown roles={user.roles} navClick={navClick}/>
                    </li>
                    <li>
                        <a role="button" onClick={signOut}>
                            Выйти
                        </a>
                    </li>
                </ul>
            )
        }
    }
}

NavRight.propTypes = {
    isAuthenticated: React.PropTypes.bool.isRequired,
    user: React.PropTypes.object,
    pathname: React.PropTypes.string.isRequired,
    signOut: React.PropTypes.func.isRequired,
    navClick: React.PropTypes.func.isRequired
};
