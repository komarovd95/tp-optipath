import React from 'react';

import SignUpContainer from '../containers/SignUpContainer';

export default class SignUp extends React.Component {
    goBack() {
        this.context.router.goBack();
    }

    render() {
        return (
            <div id="signup-form" className="react-animation__page overlay">
                <button type="button" className="close"
                        onClick={this.goBack.bind(this)}>
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
