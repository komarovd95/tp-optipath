import React from 'react';
import {connect} from 'react-redux';
import {seeProfile} from '../actions';

class UserLink extends React.PureComponent {
    constructor() {
        super();
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.seeProfile(this.props.value);
    }

    render() {
        return (
            <a onClick={this.handleClick} style={{cursor: 'pointer'}}>
                {this.props.value}
            </a>
        )
    }
}

UserLink.propTypes = {
    value: React.PropTypes.string,
    seeProfile: React.PropTypes.func.isRequired
};

export default connect(null, dispatch => ({
    seeProfile: (username) => dispatch(seeProfile(username))
}))(UserLink)