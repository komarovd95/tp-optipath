import React from 'react';

import { connect } from 'react-redux';

import ErrorNotification from '../components/common/ErrorNotification';

function mapStateToProps(state) {
    return {
        ...state.error
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onDismiss: () => dispatch({ type: 'RESET_ERROR' })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ErrorNotification)
