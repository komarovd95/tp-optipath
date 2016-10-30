import React from 'react';

import UserDriveStyle from './UserDriveStyle';

export default class UserProfile extends React.Component {
    render() {
        return (
            <div>
                <p>Имя {'%username%'}</p>
                <p>Дата {'%date%'}</p>
                <p>
                    Стиль вождения
                    <UserDriveStyle/>
                    {'Link:Сменить'}
                </p>
            </div>
        )
    }
}
