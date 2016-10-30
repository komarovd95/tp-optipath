import React from 'react';

import Navigation from '../containers/NavContainer';
import Animation from '../components/common/Animation';

export default class AppPage extends React.Component {
    render() {
        const { pathname } = this.props.location;

        return (
            <div style={{ height: '100%' }}>
                <Navigation/>
                <Animation>
                    {React.cloneElement(this.props.children, { key: pathname })}
                </Animation>
                <footer className="footer navbar-fixed-bottom">
                    <div className="container-fluid">
                        <span>Samara</span>
                    </div>
                </footer>
            </div>
        )
    }
}
