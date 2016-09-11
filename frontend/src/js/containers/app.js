import React from "react";

import { connect } from 'react-redux';

import Navigation from "./navigation";

class App extends React.Component {
    render() {
        const { pathname } = this.props.location;

        return (
            <div>
                { (pathname === '/signin' || pathname === '/signup')
                    ? null : <Navigation isAuthenticated={this.props.isAuthenticated}/>
                }

                <div className="container">
                    {React.cloneElement(this.props.children)}
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { auth } = state.appReducer;
    return auth;
}

export default connect(mapStateToProps)(App)

