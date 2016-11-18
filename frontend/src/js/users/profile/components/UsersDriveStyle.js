import React from 'react';

export default class UsersDriveStyle extends React.Component {
    render() {
        let classStr = '';
        let textStr = '';
        switch (this.props.driveStyle) {
            case 'Законопослушный':
                classStr = 'glyphicon-leaf';
                textStr = 'text-success';
                break;
            case 'Нарушитель':
                classStr = 'glyphicon-fire';
                textStr = 'text-danger';
                break;
        }

        return (
            <div>
                <span className={`glyphicon ${classStr} ${textStr}`} />
                <b className={textStr}> {this.props.driveStyle}</b>
            </div>
        )
    }
}

UsersDriveStyle.propTypes = {
    driveStyle: React.PropTypes.string
};