import React from 'react';


import ProfileContainer from '../containers/ProfileContainer';
import ProfileSidebarContainer from '../containers/ProfileSidebarContainer';
import UserProfileContainer from '../containers/UserProfileContainer';


import UsersListContainer from '../containers/users/UsersListContainer';
import UsersListFilterContainer from '../containers/users/UsersListFilterContainer';
import CarsListContainer from '../containers/cars/CarsListContainer';
import CarsListFilterContainer from '../containers/cars/CarsListFilterContainer';
import CarsFromContainer from '../containers/cars/CarsFormContainer';
import BrandsListContainer from  '../containers/brands/BrandsListContainer';
import BrandsListFilterContainer from '../containers/brands/BrandsListFilterContainer';

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
            { tabName: 'brandsDB', tabDisplayName: 'Марки' },
            { tabName: 'fuelTypesDB', tabDisplayName: 'Типы топлива' },
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
                            <UsersListContainer toolbar={<UsersListFilterContainer/>}/>
                        </ProfileTab>
                        <ProfileTab tabName="carsDB" tabDisplayName="Автомобили">
                            <CarsListContainer toolbar={<CarsListFilterContainer/>}/>
                        </ProfileTab>
                        <ProfileTab tabName="brandsDB" tabDisplayName="Марки">
                            <BrandsListContainer toolbar={<BrandsListFilterContainer/>}/>
                        </ProfileTab>
                        <ProfileTab tabName="fuelTypesDB" tabDisplayName="Типы топлива">
                            <p>Hello</p>
                        </ProfileTab>
                        <ProfileTab tabName="carsForm"
                                    tabDisplayName="Добавить/Изменить автомобиль">
                            <CarsFromContainer/>
                        </ProfileTab>
                    </ProfileContainer>
                </div>
            </div>
        )
    }
}
