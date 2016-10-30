import React from 'react';
import {Link} from 'react-router';

export default class UserLink extends React.Component {
    render() {
        return (
            <Link to={`/users/${this.props.value}`}>{this.props.value}</Link>
        )
    }
}

UserLink.propTypes = {
    value: React.PropTypes.string
};