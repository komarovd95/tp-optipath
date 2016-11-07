import React from 'react';
import { Notification } from 'react-notification';

export default class ErrorNotification extends React.Component {
    handleClick(deactivate) {
        if (this.props.dismissable) deactivate();
    }

    handleDismiss() {
        this.props.onDismiss();
    }

    render() {
        const { error } = this.props;

        return (
            <Notification isActive={!!error}
                          title="Произошла ошибка!"
                          message={error || 'Повторите запрос позже'}
                          onClick={this.handleClick.bind(this)}
                          onDismiss={this.handleDismiss.bind(this)}
                          action="закрыть"
                          activeClassName="notification alert-danger"
                          dismissAfter={4000} />
        )
    }
}

ErrorNotification.propTypes = {
    error: React.PropTypes.string,
    dismissable: React.PropTypes.bool,
    onDismiss: React.PropTypes.func
};
