import React from "react";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import shortid from 'shortid';

export default class Animation extends React.Component {
    render() {
        return (
                <ReactCSSTransitionGroup component="div"
                                         transitionName="fade-out"
                                         transitionEnterTimeout={300}
                                         transitionLeaveTimeout={300}>
                    {React.cloneElement(this.props.children,
                        { key : shortid.generate() })}
                </ReactCSSTransitionGroup>
        )
    }
}
