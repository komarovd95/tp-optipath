import React from 'react';

import { Link } from 'react-router';

import NavLink from '../components/nav_link';

export default class Navigation extends React.Component {
    render() {
        const { isAuthenticated } = this.props;

        return (
            <nav className="navbar navbar-inverse navbar-static-top">
                <div className="container">
                    <div className="navbar-header">
                        <Link to="/" className="navbar-brand">OptiPath</Link>
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse"
                                data-target="#nav-collapsed">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar" />
                            <span className="icon-bar" />
                            <span className="icon-bar" />
                        </button>
                    </div>
                    <div className="collapse navbar-collapse" id="nav-collapsed">
                        <ul className="nav navbar-nav">
                            <NavLink to="/route" activeClassName="active">Новый маршрут</NavLink>
                            { isAuthenticated === true
                                ? <NavLink to="/routes" activeClassName="active">Мои маршруты</NavLink>
                                : null
                            }
                            <NavLink to="/about" activeClassName="active">О программе</NavLink>
                            <NavLink to="/faq" activeClassName="active">FAQ</NavLink>
                        </ul>

                        { isAuthenticated === false
                            ? (
                                <ul className="nav navbar-nav navbar-right">
                                    <li><Link to="/signin">Войти</Link></li>
                                    <li>
                                        <p className="navbar-btn" style={{margin: "8px 15px"}}>
                                            <Link to="/signup" className="btn btn-success">Регистрация</Link>
                                        </p>
                                    </li>
                                </ul>
                              )
                            : null
                        }
                    </div>
                </div>
            </nav>
        )
    }
}
