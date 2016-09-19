import React from 'react';

export default class SidebarLink extends React.Component {
    static propTypes = {
        tabName: React.PropTypes.string.isRequired
    };

    handleClick(remoteClick, tabName) {
        remoteClick(tabName);
    }

    render() {
        const { currentTab, tabName, onClick } = this.props;

        console.log(currentTab + ' ' + tabName);

        return (
            <li className={currentTab === tabName ? 'active' : ''}>
                <a onClick={this.handleClick(onClick.bind(this), tabName)}>
                    {this.props.children}
                </a>
            </li>
        )
    }
}
