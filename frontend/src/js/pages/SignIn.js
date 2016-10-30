import React from 'react';

import SignInContainer from '../containers/SignInContainer';

export default class SignIn extends React.Component {
    goBack() {
        this.context.router.goBack();
    }

    render() {
        return (
            <div id="login-form" className="react-animation__page overlay">
                <button type="button" className="close" onClick={this.goBack.bind(this)}>
                    <span>&times;</span>
                </button>
                <div className="content">
                    <SignInContainer location={this.props.location}/>
                </div>
            </div>
        )
    }
}

SignIn.contextTypes = {
    router: React.PropTypes.object.isRequired
};
