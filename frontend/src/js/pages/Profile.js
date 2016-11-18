import React from 'react';

import UsersListContainer from '../users/list';
import UsersToolbarContainer from '../users/toolbar';
import UsersProfileContainer from '../users/profile';
import UsersChangePassContainer from '../users/change-pass';

import ProfileContainer from '../profile';
import ProfileLinkGroup from '../profile/components/ProfileLinkGroup';
import ProfileLink from '../profile/components/ProfileLink';


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

    // static links2 = [
    //     [
    //         new ProfileLink('profile', 'Мой профиль', <UsersProfileContainer/>)
    //     ],
    //     [
    //         new ProfileLink('routes', 'Мои маршруты', <p>Heyo</p>),
    //         new ProfileLink('cars', 'Мои автомобили', <p>Halo</p>)
    //     ],
    //     [
    //         new ProfileLink('usersDB', 'Пользователи',
    //             <UsersListContainer toolbar={<UsersToolbarContainer/>} />)
    //     ],
    //     [
    //         new ProfileLink('signOut', 'Выйти')
    //     ]
    // ];

    render() {
        return (
            <div className="container-fluid" style={{ padding: 0, margin: 0}}>
                <ProfileContainer>
                    <ProfileLinkGroup>
                        <ProfileLink name="profile"
                                     displayName="Профиль"
                                     getComponent={() => <UsersProfileContainer/>} />
                    </ProfileLinkGroup>
                    <ProfileLinkGroup>
                        <ProfileLink name="routes"
                                     displayName="Мои маршруты"
                                     getComponent={() => <p>Hello</p>}/>
                        <ProfileLink name="cars"
                                     displayName="Мои автомобили"
                                     getComponent={() => <p>Halo</p>}/>
                    </ProfileLinkGroup>
                    <ProfileLinkGroup adminOnly={true}>
                        <ProfileLink name="usersDB"
                                     displayName="Пользователи"
                                     getComponent={() =>
                                         <UsersListContainer toolbar={<UsersToolbarContainer/>}/>
                                     }/>
                    </ProfileLinkGroup>
                    <ProfileLinkGroup>
                        <ProfileLink name="changePass"
                                     displayName="Сменить пароль"
                                     getComponent={() => <UsersChangePassContainer/>}/>
                        <ProfileLink name="signOut" displayName="Выйти"/>
                    </ProfileLinkGroup>
                    {/*<ProfileTab tabName="profile" tabDisplayName="Мой профиль">*/}
                        {/*<UsersProfileContainer/>*/}
                    {/*</ProfileTab>*/}
                    {/*<ProfileTab tabName="routes" tabDisplayName="Мои маршруты">*/}
                        {/*<div className="container-fluid">*/}
                            {/*<p>Heyo</p>*/}
                        {/*</div>*/}
                    {/*</ProfileTab>*/}
                    {/*<ProfileTab tabName="cars" tabDisplayName="Мои автомобили">*/}
                        {/*<p>Halo</p>*/}
                    {/*</ProfileTab>*/}
                    {/*<ProfileTab tabName="usersDB" tabDisplayName="Пользователи">*/}
                        {/*<UsersListContainer toolbar={<UsersToolbarContainer/>} />*/}
                    {/*</ProfileTab>*/}
                    {/*<ProfileTab tabName="carsDB" tabDisplayName="Автомобили">*/}
                        {/*<CarsListContainer toolbar={<CarsListFilterContainer/>}/>*/}
                    {/*</ProfileTab>*/}
                    {/*<ProfileTab tabName="brandsDB" tabDisplayName="Марки">*/}
                        {/*<BrandsListContainer toolbar={<BrandsListFilterContainer/>}/>*/}
                    {/*</ProfileTab>*/}
                    {/*<ProfileTab tabName="fuelTypesDB" tabDisplayName="Типы топлива">*/}
                        {/*<p>Hello</p>*/}
                    {/*</ProfileTab>*/}
                    {/*<ProfileTab tabName="carsForm"*/}
                                {/*tabDisplayName="Добавить/Изменить автомобиль">*/}
                        {/*<CarsFromContainer/>*/}
                    {/*</ProfileTab>*/}
                </ProfileContainer>
                {/*<div className="row react-animation">*/}
                    {/*/!*<ProfileSidebarContainer links={ProfilePage.links} />*!/*/}
                    {/**/}
                {/*</div>*/}
            </div>
        )
    }
}
