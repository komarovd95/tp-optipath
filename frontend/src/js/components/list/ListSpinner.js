import React from 'react';

export default class ListSpinner extends React.Component {
    render() {
        if (this.props.isShown) {
            return (
                <div className="shim">
                    <span className="glyphicon glyphicon-repeat normal-right-spinner" />
                </div>
            )
        } else {
            return null;
        }
    }
}

ListSpinner.propTypes = {
    isShown: React.PropTypes.bool
};
