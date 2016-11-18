import React from 'react';

export default class GridEmpty extends React.Component {
    shouldComponentUpdate() {
        return false;
    }

    render() {
        return (
            <div style={{ textAlign: 'center' }}>
                <p>Нет данных</p>
            </div>
        )
    }
}