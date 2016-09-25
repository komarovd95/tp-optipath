import React from 'react';
import {Link} from 'react-router';

import NavLink from './NavLink';

export default class NavBar extends React.Component {
    render() {
        const { isAuthenticated, user, pathname, signOutUser } = this.props;

        return (
            <nav className="navbar navbar-inverse navbar-static-top">
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
                                Новый маршрут
                            </NavLink>
                            { isAuthenticated &&
                                <NavLink to="/routes" activeClassName="active">
                                    Мои маршруты
                                </NavLink>
                            }
                            <NavLink to="/about" activeClassName="active">
                                О программе
                            </NavLink>
                            <NavLink to="/faq" activeClassName="active">
                                FAQ
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
