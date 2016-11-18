import React from 'react';
import SignInContainer from '../users/signin';


export default class SignIn extends React.Component {
    constructor() {
        super();
        this.goBack = this.goBack.bind(this);
    }

    goBack() {
        this.context.router.goBack();
    }

    render() {
        return (
            <div id="login-form" className="react-animation__page overlay">
                <button type="button" className="close" onClick={this.goBack}>
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
