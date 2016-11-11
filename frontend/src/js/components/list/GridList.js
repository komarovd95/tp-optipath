import React from 'react';
import ReactDataGrid from 'react-data-grid';

import EmptyList from './EmptyList';
import ListPaginate from './ListPaginate';
import ListSpinner from './ListSpinner';

import DeleteModal from '../common/DeleteModal';

export default class GridList extends React.Component {
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
        const newPageable = { ...this.props.pageable };
        const newSort = { ...this.props.sort };
        const newFilter = { ...this.props.filter };

        if (page || page === 0) {
            newPageable.number = page;
        }

        if (sort) {
            newSort.field = sort.field;
            newSort.direction = sort.direction;
        }

        if (filter) {
            newFilter[filter.column] = filter.filterTerm; // TODO
        }

        this.props.requestData(newPageable, newSort, newFilter);
    }

    onSortChange(sortColumn, sortDirection) {
        const { defaultSort } = this.props;
        switch (sortDirection) {
            case 'NONE':
                this.requestData({ sort: defaultSort });
                break;
            case 'ASC':
                this.requestData({ sort: { field: sortColumn, direction: 'asc' } });
                break;
            case 'DESC':
                this.requestData({ sort: { field: sortColumn, direction: 'desc' } });
                break;
        }
    }

    onFilterChange({ column, filterTerm }) {
        this.requestData({ filter: { column: column.key, filterTerm } })
    }

    onPageChange(page) {
        this.requestData({ page })
    }

    onCellSelected(coordinates) {
        if (coordinates.rowIdx !== this.props.selected) {
            this.props.onRowClick(coordinates.rowIdx);
        }
    }

    onRowGet(index) {
        return this.props.data[index];
    }

    static getSelectionSettings(selected) {
        return {
            showCheckbox: false,
            selectBy: {
                indexes: [selected]
            }
        }
    }

    render() {
        const {
            className, columns, minHeight, data, selected, toolbar,
            onRowClick, pageable, isFetching, deleteModal, onClearFilter,
            getValidFilterValues, enableCellSelect, onRowUpdated
        } = this.props;

        const height = minHeight ? minHeight(this.minHeight) : this.minHeight();

        return (
            <div className={className}>
                <ReactDataGrid ref="grid"
                               columns={columns}
                               minHeight={height}
                               rowGetter={this.onRowGet.bind(this)}
                               rowsCount={data.length}
                               toolbar={toolbar}
                               onGridSort={this.onSortChange.bind(this)}
                               onAddFilter={this.onFilterChange.bind(this)}
                               getValidFilterValues={getValidFilterValues
                                    && getValidFilterValues.bind(this)}
                               onClearFilters={onClearFilter}
                               rowSelection={GridList.getSelectionSettings(selected)}
                               onRowClick={onRowClick}
                               emptyRowsView={EmptyList}
                               enableCellSelect={enableCellSelect}
                               onCellSelected={this.onCellSelected.bind(this)}
                               onRowUpdated={onRowUpdated} />

                <ListPaginate setPage={this.onPageChange.bind(this)}
                              {...pageable} />

                <ListSpinner isShown={isFetching} />

                <DeleteModal {...deleteModal} isFetching={isFetching}
                             data={this.onRowGet(selected)} />
            </div>
        )
    }
}

GridList.propTypes = {
    data: React.PropTypes.array.isRequired,
    selected: React.PropTypes.number,
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
        direction: React.PropTypes.string.isRequired
    }).isRequired,
    sort: React.PropTypes.shape({
        field: React.PropTypes.string.isRequired,
        direction: React.PropTypes.string.isRequired
    }),
    onClearFilter: React.PropTypes.func,
    getValidFilterValues: React.PropTypes.func,
    onRowClick: React.PropTypes.func,
    pageable: React.PropTypes.shape({
        totalPages: React.PropTypes.number.isRequired,
        number: React.PropTypes.number.isRequired,
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
    }),
    enableCellSelect: React.PropTypes.bool,
    onRowUpdated: React.PropTypes.func
};

GridList.defaultProps = {
    enableCellSelect: false
};