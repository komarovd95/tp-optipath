import React from 'react';

import {draw} from '../graph/draw';

export default class RouteDraw extends React.Component {
    componentDidMount() {
        draw();
    }

    render() {
        return (
            <div id="my-graph" />
        )
    }
}
