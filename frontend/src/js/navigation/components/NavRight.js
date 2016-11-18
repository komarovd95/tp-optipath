import React from 'react';
import { Link } from 'react-router';
import {PathUser} from '../../users/model';

import NavDropdown from './NavDropdown';

export default class NavRight extends React.Component {
    constructor() {
        super();
        this.handleSignOut = this.handleSignOut.bind(this);
    }

    handleSignOut() {
        this.props.signOut();
    }

    render() {
        const {loggedUser, pathname, navigateTab} = this.props;

        if (!loggedUser) {
            return (
                <ul className="nav navbar-nav navbar-right">
                    {pathname !== '/signin' &&
                        <li><Link to="/signin">Войти</Link></li>
                    }
                    <li>
                        <p className="navbar-btn" style={{margin: "8px 15px"}}>
                            <Link to="/signup"
                                  className="btn btn-success"
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
                        <a href="#"
                           className="dropdown-toggle"
                           data-toggle="dropdown"
                           role="button"
                           aria-haspopup="true"
                           aria-expanded="false">
                            <span className="glyphicon glyphicon-user"
                                  style={{marginRight: "10px"}}/>
                            {loggedUser.username} <span className="caret" />
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
                        <NavDropdown loggedUser={loggedUser}
                                     navigateTab={navigateTab} />
                    </li>
                    <li>
                        <a role="button" onClick={this.handleSignOut}>
                            Выйти
                        </a>
                    </li>
                </ul>
            )
        }
    }
}

NavRight.propTypes = {
    loggedUser: React.PropTypes.instanceOf(PathUser),
    pathname: React.PropTypes.string.isRequired,
    signOut: React.PropTypes.func.isRequired,
    navigateTab: React.PropTypes.func.isRequired
};

