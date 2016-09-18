import React from 'react';
import {Link} from 'react-router';

export default class Profile extends React.Component {
    render() {
        const { user } = this.props;

        return (
            <div>
                <div className="row">
                    <div className="col-lg-11">
                        <h1>{user.username}</h1>
                    </div>
                    <div className="col-lg-1">
                        <button type="button" className="btn btn-default">
                            Выйти
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}
