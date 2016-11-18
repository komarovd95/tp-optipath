import React from 'react';

export default class UsersProfileToolbar extends React.Component {
    render() {
        const {currentUser, loggedUser, signOut, changePass, deleteUser} = this.props;
        const style = {width: '100%'};

        const willRender = loggedUser.isAdmin()
            || currentUser.id === loggedUser.id;

        const deleteEnabled = loggedUser.isAdmin() && !currentUser.isAdmin()
            && currentUser.id !== loggedUser.id;

        if (willRender) {
            return (
                <tr>
                    <td>
                        <button type="button"
                                className="btn btn-default"
                                style={style}
                                onClick={changePass}>
                            Сменить пароль
                        </button>
                    </td>
                    <td>
                        {deleteEnabled ?
                            <button type="button"
                                    className="btn btn-danger"
                                    style={style}
                                    onClick={deleteUser}>
                                Удалить
                            </button> :
                            <button type="button"
                                    className="btn btn-default"
                                    style={style}
                                    onClick={signOut}>
                                Выйти
                            </button>
                        }
                    </td>
                </tr>
            )
        } else {
            return null;
        }
    }
}

UsersProfileToolbar.propTypes = {
    isAdmin: React.PropTypes.bool.isRequired
};
