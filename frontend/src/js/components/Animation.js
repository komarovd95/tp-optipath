import React from "react";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class Animation extends React.Component {
    render() {
        return (
                <ReactCSSTransitionGroup component="div"
                                         transitionName="fade-out"
                                         transitionEnterTimeout={300}
                                         transitionLeaveTimeout={300}>
                    {this.props.children}
                </ReactCSSTransitionGroup>
        )
    }
}
