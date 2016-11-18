import React from 'react';
import {browserHistory, withRouter} from 'react-router';
import {connect} from 'react-redux';


export default (Component) => {
    class AuthenticatedComponent extends React.Component {
        componentWillMount() {
            if (!this.props.loggedUser) {
                browserHistory.replace({
                    pathname: '/signin',
                    state: {
                        nextPathname: this.props.location.pathname
                    }
                });
            }
        }

        render() {
            const {loggedUser, ...rest} = this.props;

            return (
                <div className="react-animation__page">
                    {loggedUser && <Component {...rest}/>}
                </div>
            )
        }
    }

    const mapStateToProps = (state) => ({
        loggedUser: state.users.auth.loggedUser
    });

    return connect(mapStateToProps)(withRouter(AuthenticatedComponent))
}
