import React from 'react';
import { browserHistory, withRouter } from 'react-router';
import { connect } from 'react-redux';

export default function requireAuthentication(Component) {
    class AuthenticatedComponent extends React.Component {
        checkAuthenticated(isAuthenticated) {
            if (!isAuthenticated) {
                browserHistory.replace({
                    pathname: '/signin',
                    state: {
                        nextPathname: this.props.location.pathname
                    }
                });
            }
        }

        componentWillMount() {
            this.checkAuthenticated(this.props.isAuthenticated);
        }

        render() {
            return (
                <div>
                    {this.props.isAuthenticated && <Component {...this.props}/>}
                </div>
            )
        }
    }

    function mapStateToProps(state) {
        const { auth: { isAuthenticated } } = state;

        return {
            isAuthenticated
        }
    }

    return connect(mapStateToProps)(withRouter(AuthenticatedComponent))
}
