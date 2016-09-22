import React from 'react';

import RouteDraw from '../components/route_draw';

export default class RouteHolder extends React.Component {
    render() {
        return (
            <div className="container-fluid react-animation">
                <RouteDraw/>
            </div>
        )
    }
}