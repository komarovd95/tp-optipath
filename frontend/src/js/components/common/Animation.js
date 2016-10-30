import React from "react";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class Animation extends React.Component {
    render() {
        const timeout = this.props.timeout || 300;

        return (
            <ReactCSSTransitionGroup component="div"
                                     className="react-animation"
                                     transitionName="fade-out"
                                     transitionEnterTimeout={timeout}
                                     transitionLeaveTimeout={timeout}>
                {this.props.children}
            </ReactCSSTransitionGroup>
        )
    }
}

Animation.propTypes = {
    timeout: React.PropTypes.number
};
