import React from 'react';
import { Notification } from 'react-notification';
import {INFO, WARN, ERROR} from '../constants';


export default class GlobalNotification extends React.Component {
    constructor() {
        super();
        this.handleDismiss = this.handleDismiss.bind(this);
    }

    handleDismiss() {
        this.props.dismiss();
    }

    render() {
        const {isActive, level, message} = this.props;

        let title = '';
        let color = '';
        switch (level) {
            case INFO:
                title = 'Успешно!';
                color = 'info';
                break;
            case WARN:
                title = 'Внимание!';
                color = 'warn';
                break;
            case ERROR:
                title = 'Произошла ошибка!';
                color = 'error';
                break;
        }

        return (
            <Notification isActive={isActive}
                          title={title}
                          message={message}
                          onClick={this.handleDismiss}
                          onDismiss={this.handleDismiss}
                          action="закрыть"
                          className="notification-top"
                          activeClassName={`notification ${color}`}
                          dismissAfter={5000} />
        )
    }
}

GlobalNotification.propTypes = {
    isActive: React.PropTypes.bool,
    level: React.PropTypes.string,
    message: React.PropTypes.node,
    dismiss: React.PropTypes.func
};

GlobalNotification.defaultProps = {
    message: ''
};
