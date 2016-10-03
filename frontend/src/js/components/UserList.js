import React from 'react';
import ReactPaginate from 'react-paginate';
import Griddle from 'griddle-react';
import { Link } from 'react-router';

import shortid from 'shortid';

import GridList from './GridList';
import ListPaginate from './ListPaginate';
import TableFilter from '../containers/UsersActionContainer';
import TableChecker from '../containers/TableCheckerContainer';

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
                <Link to={link}>{this.props.data}</Link>
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
    handleClick(event) {
        console.log(jQuery(event.target))
    }

    render() {
        return (
            <button id={'checker' + this.props.rowData.id}
                    className="btn btn-default btn-xs" onClick={this.handleClick}>
                Выбрать
            </button>
        )
    }
}

export default class UserList extends React.Component {
    constructor() {
        super();
        this.requestData = this.requestData.bind(this);
    }

    static columns = [
        {
            columnName: 'checker',
            displayName: 'Выбрать',
            sortable: false,
            customComponent: TableChecker
        },
        {
            columnName: 'id',
            displayName: 'ID',
            sortable: true
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
            sortable: true
        },
        {
            columnName: 'roles',
            displayName: 'Роль',
            sortable: false
        }
    ];

    static rolesToString(roles) {
        return roles.includes('ROLE_ADMIN') ? 'Администратор' : 'Пользователь';
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

        if (username) {
            newPageable.username = username;
        }

        this.props.requestList({ ...pageable, ...newPageable })
    }

    componentWillMount() {
        this.requestData({});
    }

    componentWillUnmount() {
        this.props.reset();
    }

    setPage(index) {
        this.requestData({ page: index })
    }

    changeSort(field, isAscending) {
        this.requestData({ sort: { field, isAscending } })
    }

    setFilter(query) {
        this.requestData({ username: query });
    }

    render() {
        const { user: { users, isFetching, pageable } } = this.props;

        const userPanel = jQuery('#user-panel');

        let height = userPanel.height()
            - userPanel.find('div.panel-heading').outerHeight()
            - userPanel.find('div.top-section').outerHeight();

        //userPanel.find('div.griddle-body').height(height);
        //userPanel.find('div.griddle-body > div').height(height);
        console.log('height:', height);

        let paginationHeight = userPanel.find('ul.pagination').outerHeight();
        let filterHeight = userPanel.find('div.filter-container').outerHeight();
        let headerHeight = userPanel.find('thead').outerHeight();

        //userPanel.find('div.griddle-footer').css('margin-top',
        //    (height - paginationHeight - filterHeight - headerHeight
        //        - 32 * users.length - 12) + 'px');

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
                roles: UserList.rolesToString(u.roles),
                checker: ''
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
                             externalSetPageSize={() => {}}
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
                             filterPlaceholderText="Имя..." />

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
