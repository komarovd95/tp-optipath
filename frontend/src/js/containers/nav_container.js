import {connect} from 'react-redux';

import NavBar from '../components/navbar';

function mapStateToProps(state) {
    const { signIn: { user, isAuthenticated }, routing: { locationBeforeTransitions: { pathname } } } = state;
    return {
        isAuthenticated,
        user,
        pathname
    }
}

export default connect(mapStateToProps)(NavBar);