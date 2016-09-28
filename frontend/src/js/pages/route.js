import React from 'react';

import RouteDraw from '../components/route_draw';

export default class RouteHolder extends React.Component {
    render() {
        return (
            <div className="container-fluid react-animation" style={{ padding: 0  }}>
                <RouteDraw />
                {/*<div>DIMAN</div>*/}
            </div>
        )
    }
}