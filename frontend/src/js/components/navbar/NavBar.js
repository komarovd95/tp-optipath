import React from 'react';
import {Link} from 'react-router';

import NavLink from './NavLink';
import NavRight from './NavRight';

export default class NavBar extends React.Component {
    render() {
        return (
            <nav className="navbar navbar-inverse navbar-fixed-top">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <Link to="/" className="navbar-brand">
                            <img alt="OptiPath" src="./img/logo.png" />
                        </Link>
                        <button type="button" className="navbar-toggle collapsed"
                                data-toggle="collapse"
                                data-target="#nav-collapsed">
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
                            <NavLink to="/about" activeClassName="active">
                                О программе
                            </NavLink>
                            <NavLink to="/faq" activeClassName="active">
                                FAQ
                            </NavLink>
                        </ul>
                        <NavRight {...this.props} />
                    </div>
                </div>
            </nav>
        )
    }
}

NavBar.propTypes = {
    isAuthenticated: React.PropTypes.bool.isRequired,
    user: React.PropTypes.object,
    pathname: React.PropTypes.string.isRequired,
    signOut: React.PropTypes.func.isRequired,
    navClick: React.PropTypes.func.isRequired
};
