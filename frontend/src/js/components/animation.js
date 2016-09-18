import React from "react";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class Animation extends React.Component {
    render() {
        return (
            <ReactCSSTransitionGroup component="div"
                                     transitionName="fade-out"
                                     transitionEnterTimeout={600}
                                     transitionLeaveTimeout={600}>
                {this.props.children}
            </ReactCSSTransitionGroup>
        )
    }
}
