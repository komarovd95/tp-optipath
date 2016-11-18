import React from 'react';
import memoize from 'lodash/memoize';

export default class GridSpinner extends React.PureComponent {
    component = memoize((isFetching) => {
        if (isFetching) {
            return (
                <div className="shim">
                    <span className="glyphicon glyphicon-repeat normal-right-spinner" />
                </div>
            )
        } else {
            return null;
        }
    });

    render() {
        return this.component(this.props.isFetching);
    }
}

GridSpinner.propTypes = {
    isFetching: React.PropTypes.bool.isRequired
};