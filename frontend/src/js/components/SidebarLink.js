import React from 'react';

export default class SidebarLink extends React.Component {
    static propTypes = {
        tabName: React.PropTypes.string.isRequired
    };

    render() {
        const { className, tabName, onClick } = this.props;

        return (
            <li className={className}>
                <a role="button" onClick={onClick.bind(this, tabName)}>
                    {this.props.children}
                </a>
            </li>
        )
    }
}
