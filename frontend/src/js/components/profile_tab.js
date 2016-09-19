import React from 'react';

export default class ProfileTab extends React.Component {
    static propTypes = {
        tabName: React.PropTypes.string.isRequired
    };

    render() {
        return (
            <div className="react-animation">
                {this.props.children}
            </div>
        )
    }
}
