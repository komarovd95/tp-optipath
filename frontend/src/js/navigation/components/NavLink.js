import React from 'react';
import {Link} from 'react-router';

export default class NavLink extends React.Component {
    render() {
        const {children, to, activeClassName, className} = this.props;

        const isActive = this.context.router.isActive(to, true);

        return (
            <li className={isActive ? activeClassName : ''}>
                <Link to={to} className={className}>
                    {children}
                </Link>
            </li>
        )
    }
}

NavLink.propTypes = {
    to: React.PropTypes.string.isRequired,
    activeClassName: React.PropTypes.string.isRequired
};

NavLink.contextTypes = {
    router: React.PropTypes.object.isRequired
};
