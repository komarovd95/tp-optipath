import React from 'react';
import shortid from 'shortid';

import Animation from '../common/Animation';

export default class Profile extends React.Component {
    render() {
        const { currentTab, children } = this.props;

        const tab = children.find(c => c.props.tabName === currentTab);

        return (
            <div className="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 profile-content">
                <Animation>
                    {React.cloneElement(tab, { key: shortid.generate() })}
                </Animation>
            </div>
        )
    }
}

Profile.propTypes = {
    currentTab: React.PropTypes.string.isRequired
};
