import React from 'react';

import GridList from '../../list/GridList';
import UserLink from './UserLink';
import UserListFilter from './UserListFilter';

const ADMIN = 'Администратор';
const USER = 'Пользователь';

export default class UserList extends React.Component {
    static columns = [
        {
            key: 'id',
            name: 'ID',
            width: 80,
            sortable: true
        },
        {
            key: 'username',
            name: 'Имя пользователя',
            sortable: true,
            formatter: UserLink
        },
        {
            key: 'updatedAt',
            name: 'Дата изменения',
            sortable: true
        },
        {
            key: 'roles',
            name: 'Роль пользователя',
            sortable: false
        }
    ];

    static rolesToString(roles) {
        return roles.includes('ROLE_ADMIN') ? ADMIN : USER;
    }

    static isAdmin(roles) {
        return roles === ADMIN || roles.includes(ADMIN);
    }

    static rowGetter(data, selected, i) {
        const rowData = data[i];
        const rowSelected = selected || {};

        return {
            ...rowData,
            isSelected: rowData.id === rowSelected.id,
            updatedAt: new Date(rowData.updatedAt).toLocaleString('ru'),
            roles: UserList.rolesToString(rowData.roles)
        };
    }

    static message(data) {
        return (
            <p>
                Вы уверены, что хотите удалить пользователя с именем
                <b>{data && (' ' + data.username)}</b>?
            </p>
        )
    }

    onRowClick(ignored, rowData) {
        const loggedUser = this.props.loggedUser;
        const selectedUser = this.props.selectedUser || {};
        const enableActions = this.props.enableActions;

        if (selectedUser.id === rowData.id) {
            enableActions();
        } else if (loggedUser.id === rowData.id) {
            enableActions(loggedUser, ['changePass']);
        } else if (!UserList.isAdmin(rowData.roles)) {
            enableActions(rowData, ['changePass', 'changeRole', 'delete']);
        } else {
            enableActions(rowData, []);
        }
    }

    onFilterChange(filterTerm) {
        this.props.requestData(this.props.pageable, { username: filterTerm });
    }

    render() {
        const {
            users, selectedUser, isFetching, pageable, resetList, requestData,
            deleteUserIsShown, modalAccept, modalClose, filter,
            actionsEnabled, onDeleteClick
        } = this.props;

        const toolbar = (
            <UserListFilter actionsEnabled={actionsEnabled}
                            onDeleteClick={onDeleteClick}
                            onFilterChange={this.onFilterChange.bind(this)}
                            placeholder="Имя пользователя" />
        );

        return (
            <GridList className="user-list"
                      data={users}
                      columns={UserList.columns}
                      rowGetter={UserList.rowGetter}
                      selected={selectedUser}
                      toolbar={toolbar}
                      isFetching={isFetching}
                      pageable={{
                          maxPage: pageable.totalPages,
                          currentPage: pageable.number,
                          size: pageable.size
                      }}
                      filter={filter}
                      requestData={requestData}
                      defaultSort={{ field: 'id', isAscending: true }}
                      deleteModal={{
                          title: 'Удалить пользователя',
                          isOpen: deleteUserIsShown,
                          message: UserList.message,
                          onModalAccept: modalAccept.bind(null, pageable),
                          onModalClose: modalClose
                      }}
                      onRowClick={this.onRowClick.bind(this)}
                      resetList={resetList} />
        )
    }
}

UserList.propTypes = {
    users: React.PropTypes.array.isRequired,
    selectedUser: React.PropTypes.object,
    loggedUser: React.PropTypes.object.isRequired,
    isFetching: React.PropTypes.bool.isRequired,
    pageable: React.PropTypes.shape({
        totalPages: React.PropTypes.number,
        number: React.PropTypes.number,
        sort: React.PropTypes.shape({
            field: React.PropTypes.string.isRequired,
            isAscending: React.PropTypes.bool.isRequired
        })
    }).isRequired,
    filter: React.PropTypes.shape({
        username: React.PropTypes.string.isRequired
    }).isRequired,
    deleteUserIsShown: React.PropTypes.bool.isRequired,
    actionsEnabled: React.PropTypes.array.isRequired,
    requestData: React.PropTypes.func.isRequired,
    resetList: React.PropTypes.func.isRequired,
    modalAccept: React.PropTypes.func.isRequired,
    modalClose: React.PropTypes.func.isRequired,
    enableActions: React.PropTypes.func.isRequired,
    onDeleteClick: React.PropTypes.func.isRequired
};

UserList.defaultProps = {
    selectedUser: {}
};