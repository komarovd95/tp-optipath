import React from 'react';
import { createSelector } from 'reselect';

import GridList from '../../list/GridList';
import UserLink from './UserLink';

export default class UsersList extends React.Component {
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

    static message(data) {
        return (
            <p>
                Вы уверены, что хотите удалить пользователя с именем
                <b>{data && (' ' + data.username)}</b>?
            </p>
        )
    }

    getUsers = (state) => state.users;
    getSelectedIndex = (state) => state.selectedIndex;


    onRowSelected(rowIndex) {
        if (rowIndex === this.props.selectedIndex) {
            this.props.selectRow(-1);
        } else {
            this.props.selectRow(rowIndex);
        }
    }

    render() {
        const {
            users, selectedIndex, toolbar, isFetching, pageable, filter, sort,
            modalIsShown, modalAccept, modalClose,
            requestData, resetData
        } = this.props;

        return (
            <GridList className="user-list"
                      data={users}
                      columns={UsersList.columns}
                      selected={selectedIndex}
                      toolbar={toolbar}
                      isFetching={isFetching}
                      requestData={requestData}
                      resetList={resetData}
                      defaultSort={{
                          field: 'id',
                          direction: 'asc'
                      }}
                      sort={sort}
                      pageable={pageable}
                      filter={filter}
                      deleteModal={{
                          title: 'Удалить пользователя',
                          isOpen: modalIsShown,
                          message: UsersList.message,
                          onModalAccept: modalAccept,
                          onModalClose: modalClose
                      }}
                      onRowSelected={this.onRowSelected}
                      onRowClick={this.onRowSelect.bind(this)} />
        )
    }
}

UsersList.propTypes = {
    users: React.PropTypes.array.isRequired,
    selectedIndex: React.PropTypes.number,
    toolbar: React.PropTypes.element.isRequired,
    isFetching: React.PropTypes.bool.isRequired,
    pageable: React.PropTypes.shape({
        number: React.PropTypes.number,
        size: React.PropTypes.number,
        totalPages: React.PropTypes.number
    }).isRequired,
    filter: React.PropTypes.shape({
        username: React.PropTypes.string
    }).isRequired,
    sort: React.PropTypes.shape({
        field: React.PropTypes.string.isRequired,
        direction: React.PropTypes.string.isRequired
    }).isRequired,
    modalIsShown: React.PropTypes.bool.isRequired,
    requestData: React.PropTypes.func.isRequired,
    resetData: React.PropTypes.func.isRequired,
    selectRow: React.PropTypes.func.isRequired,
    modalAccept: React.PropTypes.func.isRequired,
    modalClose: React.PropTypes.func.isRequired
};
