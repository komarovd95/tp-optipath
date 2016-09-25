import React from 'react';
import { browserHistory, withRouter } from 'react-router';
import { connect } from 'react-redux';

export default function requireAuthentication(Component) {
    class AuthenticatedComponent extends React.Component {
        checkAuthenticated(isAuthenticated) {
            console.log(this.props.router);
            console.log(this.props.location);
            console.log(browserHistory);

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

        componentWillReceiveProps(nextProps) {
            this.checkAuthenticated(nextProps.isAuthenticated);
        }

        componentDidMount() {
            this.props.router.setRouteLeaveHook(this.props.route, () => {
                console.log(this.props.location);
                console.log(this.props.route);
                return 'You have unsaved information, are you sure you want to leave this page?'
            })
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
