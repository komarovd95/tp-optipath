import React from 'react';
import ReactDataGrid from 'react-data-grid';

import ListPaginate from '../list/ListPaginate';
import ListLoader from '../list/EmptyList';
import ListSpinner from '../list/ListSpinner';

import UserLink from './UserLink';
import UserDeleteModal from './UserDeleteModal';
import UserListFilterContainer from '../../containers/UsersActionContainer';

const ADMIN = 'Администратор';
const USER = 'Пользователь';

export default class UserList extends React.Component {
    static rolesToString(roles) {
        return roles.includes('ROLE_ADMIN') ? ADMIN : USER;
    }

    static isAdmin(roles) {
        return roles === ADMIN || roles.includes(ADMIN);
    }

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

    constructor() {
        super();
        this.requestData = this.requestData.bind(this);
    }

    componentDidMount() {
        this.props.requestList({});

        const profilePage = jQuery('.profile-page');

        const pageHeight = profilePage.height();
        const headerHeight = profilePage.find('h1').outerHeight(true);
        const filterHeight = profilePage.find('.user-list > .filter-row').outerHeight(true);
        const paginateHeight = profilePage.find('ul.pagination').outerHeight(true);

        this.minHeight = (pageHeight - headerHeight - filterHeight
            - paginateHeight - 20) || 350;
    }

    componentWillUnmount() {
        this.props.reset();
    }

    requestData({ page, filter, sort }) {
        const pageable = { ...this.props.user.pageable };

        if (page || page === 0) {
            pageable.number = page;
        }

        if (filter || filter === '') {
            pageable.username = filter;
        }

        if (sort) {
            pageable.sort = sort;
        }

        this.props.requestList(pageable);
    }

    onFilterChange(filter) {
        this.requestData({ filter });
    }

    onSortChange(sortColumn, sortDirection) {
        switch (sortDirection) {
            case 'NONE':
                this.requestData({ sort: { field: 'id', isAscending: true }});
                break;
            case 'ASC':
                this.requestData({ sort: { field: sortColumn, isAscending: true } });
                break;
            case 'DESC':
                this.requestData({ sort: { field: sortColumn, isAscending: false } });
                break;
        }
    }

    onRowClick(ignoredParam, rowData) {
        const currentUser = this.props.auth.user;
        const selectedUser = this.props.user.selectedUser || {};
        const enableActions = this.props.enableUserActions;

        if (selectedUser.id === rowData.id) {
            enableActions();
        } else if (currentUser.id === rowData.id) {
            enableActions(currentUser, ['changePass']);
        } else if (!UserList.isAdmin(rowData.roles)) {
            enableActions(rowData, ['changePass', 'changeRole', 'delete']);
        } else {
            enableActions(rowData, []);
        }
    }

    onPageChange(page) {
        this.requestData({ page });
    }

    rowGetter(index) {
        const row = this.props.user.users[index];
        const selectedUser = this.props.user.selectedUser || {};

        return {
            ...row,
            isSelected: selectedUser.id === row.id,
            updatedAt: new Date(row.updatedAt).toLocaleString('ru'),
            roles: UserList.rolesToString(row.roles)
        };
    }

    render() {
        const { user } = this.props;
        const { pageable } = user;

        const rowSelectionSettings = {
            showCheckbox: false,
            selectBy: {
                isSelectedKey: 'isSelected'
            }
        };

        return (
            <div className="user-list">
                <UserListFilterContainer changeFilter={this.onFilterChange.bind(this)}
                                         placeholderText="Имя пользователя..."/>

                <ReactDataGrid columns={UserList.columns}
                               minHeight={this.minHeight}
                               rowGetter={this.rowGetter.bind(this)}
                               rowsCount={user.users.length}
                               onGridSort={this.onSortChange.bind(this)}
                               rowSelection={rowSelectionSettings}
                               onRowClick={this.onRowClick.bind(this)}
                               emptyRowsView={ListLoader} />

                <div style={{ textAlign: 'center' }}>
                    <ListPaginate maxPage={pageable.totalPages}
                                  currentPage={pageable.number}
                                  setPage={this.onPageChange.bind(this)}/>
                </div>

                <ListSpinner isShown={user.isFetching} />

                <UserDeleteModal isOpen={user.deleteUserIsShown}
                                 isFetching={user.isFetching}
                                 modalClose={this.props.modalClose}
                                 modalAccept={this.props.modalAccept.bind(null, pageable)}
                                 selectedUser={user.selectedUser}/>
            </div>
        )
    }
}