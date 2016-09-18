import { connect } from 'react-redux';

import Profile from '../components/profile';

function mapStateToProps(state) {
    const { user } = state.signIn;
    return {
        user
    }
}

export default connect(mapStateToProps)(Profile)
