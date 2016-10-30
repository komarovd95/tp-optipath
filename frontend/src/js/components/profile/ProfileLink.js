import React from 'react';

export default class ProfileLink extends React.Component {
    render() {
        const { tabName, onClick } = this.props;

        return (
            <a role="button" onClick={onClick.bind(this, tabName)}>
                {this.props.children}
            </a>
        )
    }
}

ProfileLink.propTypes = {
    tabName: React.PropTypes.string.isRequired,
    onClick: React.PropTypes.func.isRequired
};