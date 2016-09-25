import React from 'react';

export default class SidebarLink extends React.Component {
    render() {
        const { tabName, onClick, currentTab, activeClass } = this.props;

        const className = tabName === currentTab ? activeClass : '';

        return (
            <li className={className}>
                <a role="button" onClick={onClick.bind(this, tabName)}>
                    {this.props.children}
                </a>
            </li>
        )
    }
}

SidebarLink.propTypes = {
    tabName: React.PropTypes.string.isRequired,
    onClick: React.PropTypes.func.isRequired,
    currentTab: React.PropTypes.string,
    activeClass: React.PropTypes.string
};
