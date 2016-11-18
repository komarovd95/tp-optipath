import React from 'react';

export default class ProfileTab extends React.Component {
    render() {
        return (
            <div className="react-animation__page container-fluid profile-page">
                <h1>{this.props.tabDisplayName}</h1>
                {this.props.children}
            </div>
        )
    }
}

ProfileTab.propTypes = {
    tabDisplayName: React.PropTypes.string.isRequired
};
