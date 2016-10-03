import React from 'react';
import shortid from 'shortid';

import Griddle from 'griddle-react';

import ListPaginate from './ListPaginate';

export default class GridList extends React.Component {
    render() {
        const { data, columns } = this.props;

        const rowGetter = (i) => {
            return data[i];
        };

        const createUserRole = (roles) => {
            return roles.includes('ROLE_ADMIN')
                ? 'Администратор'
                : 'Пользователь'
        };

        const getColumns = (columnMetadata) => {
            return columnMetadata.columnName
        };

        const getData = (d) => {
            return {
                ...d,
                updatedAt: new Date(d.updatedAt).toLocaleString('ru'),
                roles: createUserRole(d.roles),
                action: 'Delete'
            }
        };

        return (
            <Griddle results={data.map(getData)} columns={columns1.map(getColumns)}
                     columnMetadata={columns1} tableClassName="table"
                     useCustomPagerComponent="true" customPagerComponent={ListPaginate} />
        )
    }
}

const columns1 = [
    {
        columnName: 'id',
        displayName: 'ID',
        sortable: true
    },
    {
        columnName: 'username',
        displayName: 'Имя пользователя',
        sortable: true
    },
    {
        columnName: 'updatedAt',
        displayName: 'Последнее обновление',
        sortable: true
    },
    {
        columnName: 'roles',
        displayName: 'Роль',
        sortable: true
    },
    {
        columnName: 'action',
        displayName: 'Действие',
        sortable: false
    }
];