import React from 'react';
import ReactDataGrid from 'react-data-grid';

import EmptyList from './EmptyList';
import ListPaginate from './ListPaginate';
import ListSpinner from './ListSpinner';

import DeleteModal from '../common/DeleteModal';

export default class GridList extends React.Component {
    static settings = {
        showCheckbox: false,
        selectBy: {
            isSelectedKey: 'isSelected'
        }
    };

    static rowGetter(data, selected, i) {
        const rowData = data[i];
        const rowSelected = selected || {};

        return {
            ...rowData,
            isSelected: rowData.id === rowSelected.id
        };
    }

    constructor() {
        super();
        this.requestData = this.requestData.bind(this);
    }

    minHeight() {
        const profilePage = jQuery('.profile-page');

        const pageHeight = profilePage.height();
        const headerHeight = profilePage.find('h1').outerHeight(true);
        const filterHeight = profilePage.find('.' + this.props.className)
            .find('.filter-row').outerHeight(true);
        const paginateHeight = profilePage.find('ul.pagination').outerHeight(true);

        return (pageHeight - headerHeight - filterHeight - paginateHeight - 20)
            || 350;
    }

    componentDidMount() {
        this.requestData({})
    }

    componentWillUnmount() {
        this.props.resetList();
    }

    requestData({ page, sort, filter }) {
        const pageable = { ...this.props.pageable };
        const newFilter = { ...this.props.filter };

        if (page || page === 0) {
            pageable.number = page;
        } else {
            pageable.number = pageable.currentPage;
        }

        if (sort) {
            pageable.sort = sort;
        }

        if (filter) {
            newFilter[filter.column] = filter.filterTerm;
        }

        this.props.requestData(pageable, newFilter);
    }

    onSortChange(sortColumn, sortDirection) {
        const { defaultSort } = this.props;
        switch (sortDirection) {
            case 'NONE':
                this.requestData({ sort: defaultSort });
                break;
            case 'ASC':
                this.requestData({ sort: { field: sortColumn, isAscending: true } });
                break;
            case 'DESC':
                this.requestData({ sort: { field: sortColumn, isAscending: false } });
                break;
        }
    }

    onFilterChange({ column, filterTerm }) {
        this.requestData({ filter: { column: column.key, filterTerm } })
    }

    onPageChange(page) {
        this.requestData({ page })
    }

    render() {
        const {
            className, columns, minHeight, rowGetter, data, selected, toolbar,
            onRowClick, pageable, isFetching, deleteModal, onFilterClear,
            getValidFilterValues
        } = this.props;

        const height = minHeight ? minHeight(this.minHeight) : this.minHeight();
        const getter = rowGetter || GridList.rowGetter;

        return (
            <div className={className}>
                <ReactDataGrid columns={columns}
                               minHeight={height}
                               rowGetter={getter.bind(this, data, selected)}
                               rowsCount={data.length}
                               toolbar={toolbar}
                               onGridSort={this.onSortChange.bind(this)}
                               onAddFilter={this.onFilterChange.bind(this)}
                               getValidFilterValues={getValidFilterValues
                                    && getValidFilterValues.bind(this)}
                               onClearFilters={onFilterClear && onFilterClear.bind(this)}
                               rowSelection={GridList.settings}
                               onRowClick={onRowClick && onRowClick.bind(this)}
                               emptyRowsView={EmptyList} />

                <ListPaginate setPage={this.onPageChange.bind(this)}
                              {...pageable} />

                <ListSpinner isShown={isFetching} />

                <DeleteModal {...deleteModal} isFetching={isFetching}
                             data={selected} />
            </div>
        )
    }
}

GridList.propTypes = {
    data: React.PropTypes.array.isRequired,
    selected: React.PropTypes.object,
    columns: React.PropTypes.arrayOf(React.PropTypes.shape({
        key: React.PropTypes.string.isRequired,
        name: React.PropTypes.string.isRequired,
        sortable: React.PropTypes.bool,
        filterable: React.PropTypes.bool,
        filterRenderer: React.PropTypes.any
    })).isRequired,
    minHeight: React.PropTypes.func,
    rowGetter: React.PropTypes.func,
    toolbar: React.PropTypes.element,
    requestData: React.PropTypes.func.isRequired,
    resetList: React.PropTypes.func.isRequired,
    defaultSort: React.PropTypes.shape({
        field: React.PropTypes.string.isRequired,
        isAscending: React.PropTypes.bool.isRequired
    }).isRequired,
    onClearFilter: React.PropTypes.func,
    getValidFilterValues: React.PropTypes.func,
    onRowClick: React.PropTypes.func,
    pageable: React.PropTypes.shape({
        maxPage: React.PropTypes.number.isRequired,
        currentPage: React.PropTypes.number.isRequired,
        size: React.PropTypes.number
    }).isRequired,
    filter: React.PropTypes.object,
    isFetching: React.PropTypes.bool,
    deleteModal: React.PropTypes.shape({
        title: React.PropTypes.string.isRequired,
        isOpen: React.PropTypes.bool.isRequired,
        message: React.PropTypes.func.isRequired,
        onModalClose: React.PropTypes.func.isRequired,
        onModalAccept: React.PropTypes.func.isRequired
    })
};