import {connect} from 'react-redux';
import {resetNotification} from './actions';
import GlobalNotification from './components/GlobalNotification';


const mapStateToProps = (state) => ({
    message: state.notifications.message,
    level: state.notifications.level,
    isActive: state.notifications.isActive
});

const mapDispatchToProps = (dispatch) => ({
    dismiss: () => dispatch(resetNotification())
});

export default connect(mapStateToProps, mapDispatchToProps)(GlobalNotification)