import React from 'react';

import {DEFAULT_SORT, COLUMNS} from '../constants';
import list from '../../../commons/list';
const GridList = list.components.GridList;

export default class UsersList extends React.Component {
    constructor() {
        super();
        this.onRequestData = this.onRequestData.bind(this);
        this.onResetData = this.onResetData.bind(this);
        this.onRowSelected = this.onRowSelected.bind(this);
    }

    onRequestData(pageable, sort, filter) {
        this.props.requestData(pageable, sort, filter);
    }

    onResetData() {
        this.props.resetData();
    }

    onRowSelected(rowUser) {
        this.props.selectUser(rowUser);
    }

    render() {
        const {users, toolbar, isFetching, pageable, filter, sort} = this.props;

        return (
            <GridList className="user-list"
                      data={users}
                      columns={COLUMNS}
                      defaultSort={DEFAULT_SORT}
                      isFetching={isFetching}
                      toolbar={toolbar}
                      pageable={pageable}
                      sort={sort}
                      filter={filter}
                      requestData={this.onRequestData}
                      resetList={this.onResetData}
                      onRowSelected={this.onRowSelected} />
        )
    }
}

UsersList.propTypes = {};
