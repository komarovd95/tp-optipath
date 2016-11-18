import React from 'react';
import ReactDataGrid from 'react-data-grid';

import GridSpinner from './GridSpinner';
import GridEmpty from './GridEmpty';
import GridPaginate from './GridPaginate';
import GridModal from './GridModal';


export default class GridList extends React.Component {
    constructor() {
        super();
        this.onRowGet = this.onRowGet.bind(this);
        this.minHeight = this.minHeight.bind(this);
        this.onRowSelect = this.onRowSelect.bind(this);
        this.requestData = this.requestData.bind(this);
        this.onSortChange = this.onSortChange.bind(this);
        this.onPageChange = this.onPageChange.bind(this);
        this.onFilterChange = this.onFilterChange.bind(this);
        this.onCellSelected = this.onCellSelected.bind(this);
        this.getSelectionSettings = this.getSelectionSettings.bind(this);
    }

    state = {
        selectedIndex: -1
    };

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

    componentWillReceiveProps(nextProps) {
        if (this.props.data !== nextProps.data) {
            this.setState({
                selectedIndex: -1
            })
        }
    }

    requestData({page, sort, filter}) {
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
        const {defaultSort} = this.props;
        switch (sortDirection) {
            case 'NONE':
                this.requestData({sort: defaultSort});
                break;
            case 'ASC':
                this.requestData({sort: {field: sortColumn, direction: 'asc'}});
                break;
            case 'DESC':
                this.requestData({sort: {field: sortColumn, direction: 'desc'}});
                break;
        }
    }

    onFilterChange({column, filterTerm}) {
        this.requestData({filter: {column: column.key, filterTerm}})
    }

    onPageChange(page) {
        this.requestData({page})
    }

    onRowSelect(index) {
        const selectedIndex = this.state.selectedIndex;

        if (selectedIndex === index) {
            this.setState({
                selectedIndex: -1
            });

            this.props.onRowSelected();
        } else {
            this.setState({
                selectedIndex: index
            });

            this.props.onRowSelected(this.props.data[index]);
        }
    }

    onRowGet(i) {
        return this.props.data[i];
    }

    onCellSelected(coordinates) {
        if (coordinates.rowIdx !== this.state.selectedIndex) {
            this.onRowSelect(coordinates.rowIdx);
        }
    }

    getSelectionSettings() {
        return {
            showCheckbox: false,
            selectBy: {
                indexes: [this.state.selectedIndex]
            }
        }
    }

    render() {
        const {
            className, columns, data, toolbar, selected, pageable, isFetching,
            modal, enableCellSelect,
            minHeight, getValidFilterValues, onClearFilters, onRowUpdated
        } = this.props;

        const height = minHeight ? minHeight(this.minHeight) : this.minHeight();
        // const rowsCount = data.length;
        const rowSelection = this.getSelectionSettings();

        return (
            <div className={className}>
                <ReactDataGrid ref="grid"
                               columns={columns}
                               rowGetter={this.onRowGet}
                               rowsCount={data.length}
                               minHeight={height}
                               emptyRowsView={GridEmpty}
                               toolbar={toolbar}
                               onGridSort={this.onSortChange}
                               enableCellSelect={enableCellSelect}
                               rowSelection={rowSelection}
                               onRowClick={this.onRowSelect}
                               onCellSelected={this.onCellSelected}
                    //toolbar={toolbar}
                    //onAddFilter={this.onFilterChange}
                    //getValidFilterValues={getValidFilterValues}
                    //onClearFilters={onClearFilters}
                    //rowSelection={selectionSettings}
                    //onRowClick={this.onRowSelect}
                    //emptyRowsView={EmptyList}
                    //enableCellSelect={enableCellSelect}
                    //onCellSelected={this.onCellSelected}
                    //onRowUpdated={onRowUpdated}
                />

                <GridSpinner isFetching={isFetching} />
                <GridPaginate totalPages={pageable.totalPages}
                              number={pageable.number}
                              onPageChange={this.onPageChange} />
                <GridModal title={modal.title}
                           message={modal.message}
                           isOpen={modal.isOpen}
                           onModalClose={modal.onModalClose}
                           onModalAccept={modal.onModalAccept}
                           isFetching={isFetching} />
            </div>
        )
    }
}

// GridList.propTypes = {
//     className: React.PropTypes.string,
//     data: React.PropTypes.array.isRequired,
//     selected: React.PropTypes.number,
//     columns: React.PropTypes.arrayOf(React.PropTypes.shape({
//         key: React.PropTypes.string.isRequired,
//         name: React.PropTypes.string.isRequired,
//         sortable: React.PropTypes.bool,
//         filterable: React.PropTypes.bool,
//         filterRenderer: React.PropTypes.any
//     })).isRequired,
//     minHeight: React.PropTypes.func,
//     toolbar: React.PropTypes.element,
//     requestData: React.PropTypes.func.isRequired,
//     resetList: React.PropTypes.func.isRequired,
//     defaultSort: React.PropTypes.shape({
//         field: React.PropTypes.string.isRequired,
//         direction: React.PropTypes.string.isRequired
//     }).isRequired,
//     sort: React.PropTypes.shape({
//         field: React.PropTypes.string.isRequired,
//         direction: React.PropTypes.string.isRequired
//     }),
//     onClearFilters: React.PropTypes.func,
//     getValidFilterValues: React.PropTypes.func,
//     pageable: React.PropTypes.shape({
//         totalPages: React.PropTypes.number.isRequired,
//         number: React.PropTypes.number.isRequired,
//         size: React.PropTypes.number
//     }).isRequired,
//     filter: React.PropTypes.object,
//     isFetching: React.PropTypes.bool,
//     deleteModal: React.PropTypes.shape({
//         title: React.PropTypes.string.isRequired,
//         isOpen: React.PropTypes.bool.isRequired,
//         message: React.PropTypes.func.isRequired,
//         onModalClose: React.PropTypes.func.isRequired,
//         onModalAccept: React.PropTypes.func.isRequired
//     }),
//     enableCellSelect: React.PropTypes.bool,
//     onRowSelected: React.PropTypes.func,
//     onRowUpdated: React.PropTypes.func
// };
//
// GridList.defaultProps = {
//     enableCellSelect: false
// };

GridList.defaultProps = {
    modal: {
        title: '',
        isOpen: false,
        message: null,
        onModalClose: () => {},
        onModalAccept: () => {},
        data: null
    }
};