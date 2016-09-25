import React from 'react';

import Navigation from '../containers/NavContainer';
import Animation from '../components/Animation';

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
