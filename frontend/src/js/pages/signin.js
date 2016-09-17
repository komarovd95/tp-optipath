import React from 'react';

import SignInContainer from '../containers/signin_container';

export default class SignIn extends React.Component {
    goBack() {
        this.context.router.goBack();
    }

    render() {
        return (
            <div id="login-form" className="overlay">
                <button type="button" className="close" onClick={this.goBack.bind(this)}>
                    <span>&times;</span>
                </button>
                <div className="content">
                    <SignInContainer />
                </div>
            </div>
        )
    }
}

SignIn.contextTypes = {
    router: React.PropTypes.object.isRequired
};
