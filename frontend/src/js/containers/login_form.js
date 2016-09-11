import React from 'react';
import { connect } from 'react-redux';


class LoginForm extends React.Component {
    componentDidMount() {
        document.querySelector('body').style.backgroundColor = '#222';
    }

    componentWillUnmount() {
        document.querySelector('body').style.backgroundColor = '#fff';
    }

    render() {
        return (
            <p>Login</p>
        )
    }
}

function mapStateToProps(state) {
    console.log(state);
    return state;
}

export default connect(mapStateToProps)(LoginForm)
