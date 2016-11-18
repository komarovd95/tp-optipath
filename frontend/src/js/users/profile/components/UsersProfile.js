import React from 'react';
import UsersDriveStyle from './UsersDriveStyle';
import UsersProfileToolbar from './UsersProfileToolbar';
import {PathUser} from '../../model';

export default class UsersProfile extends React.Component {
    componentWillUnmount() {
        this.props.reset();
    }

    render() {
        const {user, loggedUser, signOut, goBack, changePass, deleteUser, changeRole} = this.props;

        const sameUser = user.id === loggedUser.id;
        const changeRoleEnabled = !sameUser && loggedUser.isAdmin()
            && !user.isAdmin();

        return (
            <div className="row">
                <div className="col-md-8 col-lg-6 col-sm-12">
                    <table className="table table-user-profile">
                        <tbody>
                            <tr>
                                <td>Имя:</td>
                                <td><b>{user.username}</b></td>
                            </tr>
                            <tr>
                                <td>Дата регистрации:</td>
                                <td>{user.createdAt}</td>
                            </tr>
                            <tr>
                                <td>Стиль вождения:</td>
                                <td>
                                    <UsersDriveStyle driveStyle={user.driveStyle}/>
                                    {sameUser &&
                                        <button type="button"
                                                className="btn btn-xs">
                                            Сменить
                                        </button>
                                    }
                                </td>
                            </tr>
                            <tr>
                                <td>Роль:</td>
                                <td>
                                    <div>
                                        {user.role}
                                    </div>
                                    {changeRoleEnabled &&
                                        <button type="button"
                                                className="btn btn-xs"
                                                onClick={changeRole}>
                                            Сделать администратором
                                        </button>
                                    }
                                </td>
                            </tr>
                            <UsersProfileToolbar isAdmin={user.isAdmin()}
                                                 signOut={signOut}
                                                 loggedUser={loggedUser}
                                                 currentUser={user}
                                                 changePass={changePass}
                                                 deleteUser={deleteUser} />
                            {!sameUser &&
                                <tr>
                                    <td colSpan={2}>
                                        <button type="button"
                                                className="btn btn-default"
                                                style={{width: '100%'}}
                                                onClick={goBack}>
                                            Назад
                                        </button>
                                    </td>
                                </tr>
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

UsersProfile.propTypes = {
    user: React.PropTypes.instanceOf(PathUser),
    loggedUser: React.PropTypes.instanceOf(PathUser)
};