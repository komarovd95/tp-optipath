import React from 'react';


import ProfileContainer from '../containers/ProfileContainer';
import ProfileSidebarContainer from '../containers/ProfileSidebarContainer';
import UsersContainer from '../containers/UsersContainer';
import UserProfileContainer from '../containers/UserProfileContainer';
import CarContainer from '../containers/CarContainer';

import ProfileTab from '../components/profile/ProfileTab';

export default class ProfilePage extends React.Component {
    static links = [
        [
            { tabName: 'profile', tabDisplayName: 'Мои профиль'}
        ],
        [
            { tabName: 'routes', tabDisplayName: 'Мои маршруты'},
            { tabName: 'cars', tabDisplayName: 'Мои автомобили' }
        ],
        [
            { tabName: 'usersDB', tabDisplayName: 'Пользователи' },
            { tabName: 'carsDB', tabDisplayName: 'Автомобили' },
            { tabName: 'routesDB', tabDisplayName: 'Маршруты' }
        ],
        [
            { tabName: 'changePass', tabDisplayName: 'Сменить пароль' },
            { tabName: 'signOut', tabDisplayName: 'Выйти' }
        ]
    ];

    render() {
        return (
            <div className="container-fluid" style={{ padding: 0, margin: 0}}>
                <div className="row react-animation">
                    <ProfileSidebarContainer links={ProfilePage.links} />
                    <ProfileContainer>
                        <ProfileTab tabName="profile" tabDisplayName="Мой профиль">
                            <UserProfileContainer/>
                        </ProfileTab>
                        <ProfileTab tabName="routes" tabDisplayName="Мои маршруты">
                            <div className="container-fluid">
                                <p>Heyo</p>
                            </div>
                        </ProfileTab>
                        <ProfileTab tabName="cars" tabDisplayName="Мои автомобили">
                            <p>Halo</p>
                        </ProfileTab>
                        <ProfileTab tabName="usersDB" tabDisplayName="Пользователи">
                            <UsersContainer/>
                        </ProfileTab>
                        <ProfileTab tabName="carsDB" tabDisplayName="Автомобили">
                            <CarContainer/>
                        </ProfileTab>
                    </ProfileContainer>
                </div>
            </div>
        )
    }
}
