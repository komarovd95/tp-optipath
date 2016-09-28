import React from 'react';

export default class ProfileLink extends React.Component {
    render() {
        const { tabName, onClick } = this.props;

        const handleClick = onClick.bind(this, tabName);

        return (
            <a role="button" onClick={handleClick}>
                {this.props.children}
            </a>
        )
    }
}
