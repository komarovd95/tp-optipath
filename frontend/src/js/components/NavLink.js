import React from 'react';

import { Link } from 'react-router';

export default class NavLink extends React.Component {
    render() {
        const { children, to, activeClassName } = this.props;

        const isActive = this.context.router.isActive(to, true);

        return (
            <li className={isActive ? activeClassName : ''}>
                <Link to={to} className={this.props.className}>
                    {children}
                </Link>
            </li>
        )
    }
}

NavLink.contextTypes = {
    router: React.PropTypes.object.isRequired
};
