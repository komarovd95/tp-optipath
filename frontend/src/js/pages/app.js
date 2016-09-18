import React from 'react';

import Navigation from '../containers/nav_container';
import Animation from '../components/animation';

export default class AppPage extends React.Component {
    render() {
        const { pathname } = this.props.location;

        return (
            <div>
                <Navigation/>
                <Animation>
                    {React.cloneElement(this.props.children, { key: pathname })}
                </Animation>
            </div>
        )
    }
}
