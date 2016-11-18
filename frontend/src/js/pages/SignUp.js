import React from 'react';
import SignUpContainer from '../users/signup';


export default class SignUp extends React.Component {
    constructor() {
        super();
        this.goBack = this.goBack.bind(this);
    }

    goBack() {
        this.context.router.goBack();
    }

    render() {
        return (
            <div id="signup-form" className="react-animation__page overlay">
                <button type="button" className="close"
                        onClick={this.goBack}>
                    <span>&times;</span>
                </button>
                <div className="content">
                    <SignUpContainer />
                </div>
            </div>
        )
    }
}

SignUp.contextTypes = {
    router: React.PropTypes.object.isRequired
};
