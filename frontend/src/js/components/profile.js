import React from 'react';
import {Link} from 'react-router';

import Animation from './animation';

export default class Profile extends React.Component {
    render() {
        const { user, currentTab } = this.props;

        const tab = this.props.children.find(c => c.props.tabName === currentTab);

        console.log(tab);

        return (
            <div className="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 profile-main">
                <h1>{user.username}</h1>
                <Animation>
                    {tab}
                </Animation>
            </div>
        )
    }
}