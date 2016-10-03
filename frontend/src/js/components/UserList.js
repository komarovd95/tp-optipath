import React from 'react';
import ReactPaginate from 'react-paginate';
import Griddle from 'griddle-react';
import { Link } from 'react-router';

import shortid from 'shortid';

import GridList from './GridList';
import ListPaginate from './ListPaginate';
import TableFilter from '../containers/UsersActionContainer';

class Loader extends React.Component {
    render() {
        return (
            <p>Loading...</p>
        )
    }
}

class SortableHeader extends React.Component {
    render() {
        const { columnName, displayName, sortColumn, sortAscending } = this.props;

        const sortIcon = (columnName === sortColumn) && (sortAscending
                ? <span className="glyphicon glyphicon-triangle-bottom" />
                : <span className="glyphicon glyphicon-triangle-top" />);

        return (
            <div>{displayName} {sortIcon}</div>
        )
    }
}

class TableLink extends React.Component {
    render() {
        const link = '/users/id' + this.props.rowData.id;

        return (
            <div className="td-component">
                <Link to={link}>{this.props.data}</Link>
            </div>
        )
    }
}

class TableAction extends React.Component {
    render() {
        return (

            <div className="table-action-column">
                <button className="btn btn-default btn-xs">Сменить пароль</button>
                <button className="btn btn-default btn-xs">Изменить роль</button>
                <button className="btn btn-danger btn-xs">Удалить</button>
            </div>
        )
    }
}

class TableComponent extends React.Component {
    render() {
        return (
            <div className="td-component">{this.props.data}</div>
        )
    }
}

export default class UserList extends React.Component {
    constructor() {
        super();
        this.request = this.request.bind(this);
        this.requestData = this.requestData.bind(this);
    }

    static columns = [
        {
            columnName: 'id',
            displayName: 'ID',
            sortable: true,
            customComponent: TableComponent
        },
        {
            columnName: 'username',
            displayName: 'Имя пользователя',
            sortable: true,
            customComponent: TableLink
        },
        {
            columnName: 'updatedAt',
            displayName: 'Последнее обновление',
            sortable: true,
            customComponent: TableComponent
        },
        {
            columnName: 'roles',
            displayName: 'Роль',
            sortable: false,
            customComponent: TableComponent
        }
    ];

    static rolesToString(roles) {
        return roles.includes('ROLE_ADMIN') ? 'Администратор' : 'Пользователь';
    }

    request({ selected: page, sort }) {
        const { requestList, user: { pageable } } = this.props;

        const height = jQuery('#user-panel').height();
        const pageSize = Math.floor((height - 153) / 39);

        const pageInfo = { size: 2 };

        if (page) {
            pageInfo.number = page;
        }

        if (sort) {
            pageInfo.sort = sort;
        }

        requestList({ ...pageable, ...pageInfo });
    }

    requestData({ page, sort, username }) {
        const { user: { pageable } } = this.props;

        const newPageable = {};

        if (page || page === 0) {
            newPageable.number = page;
        }

        if (sort) {
            newPageable.sort = sort;
        }

        if (username || username === '') {
            newPageable.username = username;
        }

        this.props.requestList({ ...pageable, ...newPageable })
    }

    handleClick(field) {
        if (field === 'action' || field === 'roles') {
            return;
        }

        let sort = this.props.user.pageable.sort;

        const sortItems = sort.split(',');

        if (sortItems[0] === field) {
            sort = field + ',' + (sortItems[1] === 'asc' ? 'desc' : 'asc');
        } else {
            sort = field + ',asc';
        }

        this.request({ sort });
    }

    componentDidMount() {
        this.requestData({});
    }

    componentWillUnmount() {
        this.props.reset();
    }

    setPage(index) {
        console.log('index:', index);
        this.requestData({ page: index })
    }

    changeSort(field, isAscending) {
        this.requestData({ sort: { field, isAscending } })
    }

    setFilter(query) {
        this.requestData({ username: query });
    }

    rowClick(constructor) {
        const currentUser = this.props.auth.user;
        const rowUser = constructor.props.data;

        if (currentUser.username === rowUser.username) {
            this.props.enableUserActions(['changePass']);
        } else if (rowUser.roles !== 'Администратор') {
            this.props.enableUserActions(['changePass', 'changeRole', 'delete']);
        } else {
            this.props.enableUserActions([]);
        }
    }

    render() {
        const { user: { users, isFetching, pageable } } = this.props;

        const userPanel = jQuery('#user-panel');

        let height = userPanel.height()
            - userPanel.find('div.panel-heading').outerHeight()
            - userPanel.find('div.top-section').outerHeight();

        userPanel.find('div.griddle-body').height(height);
        userPanel.find('div.griddle-body > div').height(height);
        console.log('height:', height);

        const columns = UserList.columns.map(c => c.columnName);
        const metadata = UserList.columns.map(c => {
            if (c.sortable) {
                return {
                    ...c,
                    customHeaderComponent: SortableHeader,
                    customHeaderComponentProps: {
                        sortColumn: pageable.sort.field,
                        sortAscending: pageable.sort.isAscending
                    }
                }
            }

            return c;
        });

        const data = users.map(u => {
            return {
                ...u,
                updatedAt: new Date(u.updatedAt).toLocaleString('ru'),
                roles: UserList.rolesToString(u.roles)
            }
        });

        return (
            <div className="user-list">
                <div id="user-panel" className="panel panel-default">
                    <div className="panel-heading">Пользователи OptiPath</div>
                    <Griddle useExternal={true}
                             externalSetPage={this.setPage.bind(this)}
                             externalChangeSort={this.changeSort.bind(this)}
                             externalSortColumn={pageable.sort.field}
                             externalSortAscending={pageable.sort.isAscending}
                             externalSetFilter={this.setFilter.bind(this)}
                             externalSetPageSize={this.setPage}
                             externalMaxPage={pageable.totalPages}
                             externalCurrentPage={pageable.number}
                             externalLoadingComponent={Loader}
                             externalIsLoading={isFetching}
                             results={data}
                             columns={columns}
                             columnMetadata={metadata}
                             tableClassName="table"
                             useCustomPagerComponent={true}
                             customPagerComponent={ListPaginate}
                             showFilter={true}
                             useCustomFilterComponent={true}
                             customFilterComponent={TableFilter}
                             filterPlaceholderText="Имя..."
                             onRowClick={this.rowClick.bind(this)} />

                    {/*<ReactPaginate previousLabel="назад"*/}
                                   {/*nextLabel="вперед"*/}
                                   {/*breakLabel={<a href="">...</a>}*/}
                                   {/*breakClassName="break-me"*/}
                                   {/*pageNum={pageable.totalPages}*/}
                                   {/*initialSelected={pageable.number}*/}
                                   {/*marginPagesDisplayed={2}*/}
                                   {/*pageRangeDisplayed={5}*/}
                                   {/*clickCallback={this.request}*/}
                                   {/*containerClassName="pagination"*/}
                                   {/*subContainerClassName="pages pagination"*/}
                                   {/*activeClassName="active" />*/}
                </div>
            </div>
        )
    };
}

const createTableHead = (sort, onClick) => {
    const heads = [
        {
            key: 'id',
            content: 'ID'
        },
        {
            key: 'username',
            content: 'Имя пользователя'
        },
        {
            key: 'updatedAt',
            content: 'Последнее обновление'
        },
        {
            key: 'roles',
            content: 'Роль'
        },
        {
            key: 'action',
            content: 'Действие'
        }
    ];

    return (
        <thead>
            <tr>
                {heads.map(h => {
                    return (
                        <th key={h.key} onClick={() => onClick(h.key)}>
                            {h.content} {
                                sort.field === h.key && (sort.direction === 'asc'
                                    ? <span className="glyphicon glyphicon-triangle-bottom" />
                                    : <span className="glyphicon glyphicon-triangle-top" />
                                )
                            }
                        </th>
                    )
                })}
            </tr>
        </thead>
    )
};

const renderListItem = (user) => {
    return (
        <tr key={shortid.generate()}>
            <td key={shortid.generate()}>{user.id}</td>
            <td key={shortid.generate()}>{user.username}</td>
            <td key={shortid.generate()}>
                {new Date(user.updatedAt).toLocaleDateString()}
            </td>
            <td key={shortid.generate()}>{createUserRole(user.roles)}</td>
            <td key={shortid.generate()}>
                <button className="btn btn-default btn-xs">
                    Удалить
                </button>
            </td>
        </tr>
    )
};

const createUserRole = (roles) => {
    return roles.find(r => r === 'ROLE_ADMIN') ? 'Администратор' : 'Пользователь'
};

const columns1 = [
    {
        key: 'id',
        name: 'ID',
        sortable: true
    },
    {
        key: 'username',
        name: 'Имя пользователя',
        sortable: true
    },
    {
        key: 'updatedAt',
        name: 'Последнее обновление',
        sortable: true
    },
    {
        key: 'roles',
        name: 'Роль',
        sortable: true
    },
    {
        key: 'action',
        name: 'Действие'
    }
];
