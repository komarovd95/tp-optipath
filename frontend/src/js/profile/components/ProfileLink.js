import React from 'react';

export default class ProfileLink extends React.Component {
    constructor() {
        super();
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        const {name} = this.props;
        if (name === 'signOut') {
            this.props.signOut();
        } else {
            this.props.changeTab(name);
        }
    }

    render() {
        const {activeTab, name, displayName} = this.props;

        return (
            <li className={(activeTab === name) && 'active'}>
                <a role="button" onClick={this.handleClick}>
                    {displayName}
                </a>
            </li>
        )
    }
}

ProfileLink.propTypes = {
    name: React.PropTypes.string.isRequired,
    displayName: React.PropTypes.string.isRequired,
    getComponent: React.PropTypes.func,
    changeTab: React.PropTypes.func,
    signOut: React.PropTypes.func,
    activeTab: React.PropTypes.string
};
