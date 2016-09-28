import React from 'react';

export default class ProfileTab extends React.Component {
    render() {
        return (
            <div className="container-fluid react-animation profile-tab">
                {this.props.children}
            </div>
        )
    }
}

ProfileTab.propTypes = {
    tabName: React.PropTypes.string.isRequired
};
