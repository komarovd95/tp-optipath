import React from 'react';

import RouteDraw from '../components/route_draw';

export default class RouteHolder extends React.Component {
    render() {
        return (
            <div className="react-animation__page container-fluid"
                 style={{ padding: 0  }}>
                <RouteDraw />
            </div>
        )
    }
}