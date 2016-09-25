import React from 'react';

export default class ProfileTab extends React.Component {
    render() {
        return (
            <div className="react-animation">
                {this.props.children}
            </div>
        )
    }
}

ProfileTab.propTypes = {
    tabName: React.PropTypes.string.isRequired
};
