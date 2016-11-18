import React from 'react';

import Animation from '../components/common/Animation';

import ModalContainer from '../modal';
import NotificationContainer from '../notifications';
import NavigationContainer from '../navigation';

export default class AppPage extends React.Component {
    render() {
        const {pathname} = this.props.location;

        return (
            <div style={{ height: '100%' }}>
                <NavigationContainer/>
                <NotificationContainer/>
                <ModalContainer/>
                <Animation>
                    {React.cloneElement(this.props.children, {key: pathname})}
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
