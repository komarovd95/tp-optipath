import React from "react";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import { connect } from 'react-redux';

import Navigation from "./navigation";

class App extends React.Component {
    render() {
        const { pathname } = this.props.location;

        return (
            <div>
                <Navigation isAuthenticated={this.props.isAuthenticated}/>
                <ReactCSSTransitionGroup component="div"
                                         transitionName="fade-out"
                                         transitionEnterTimeout={600}
                                         transitionLeaveTimeout={600}>
                    {React.cloneElement(this.props.children, { key: pathname })}
                </ReactCSSTransitionGroup>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { auth } = state.appReducer;
    return auth;
}

export default connect(mapStateToProps)(App)

