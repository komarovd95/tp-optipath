import React from 'react';
import ReactDataGrid from 'react-data-grid';

import NumericFilter from '../filters/NumericFilter';
import AutoCompleteFilter from '../filters/AutoCompleteFilter';
import TextFilter from '../filters/TextFilter';

import ListLoader from '../list/EmptyList';
import ListPaginate from '../list/ListPaginate';
import ListSpinner from '../list/ListSpinner';

import CarListFilter from './CarListFilter';

export default class CarList extends React.Component {
    static columns = [
        {
            key: 'brand',
            name: 'Марка',
            sortable: true,
            filterable: true,
            filterRenderer: AutoCompleteFilter
        },
        {
            key: 'name',
            name: 'Модель',
            sortable: true,
            filterable: true,
            filterRenderer: TextFilter
        },
        {
            key: 'fuelType',
            name: 'Тип топлива',
            sortable: true,
            filterable: true,
            filterRenderer: AutoCompleteFilter
        },
        {
            key: 'fuelConsumption',
            name: 'Потребление',
            sortable: true,
            filterable: true,
            filterRenderer: NumericFilter
        },
        {
            key: 'maxVelocity',
            name: 'Макс. скорость',
            sortable: true,
            filterable: true,
            filterRenderer: NumericFilter
        }
    ];

    static rowSelectionSettings = {
        showCheckbox: false,
        selectBy: {
            isSelectedKey: 'isSelected'
        }
    };

    constructor() {
        super();
        this.requestData = this.requestData.bind(this);
    }

    componentDidMount() {
        this.props.requestData({});
    }

    requestData({ page, sort, filter }) {
        const pageable = { ...this.props.car.pageable };
        const newFilter = { ...this.props.car.filter };

        console.log('pageable', pageable);

        if (page || page === 0) {
            pageable.number = page;
        }

        if (sort) {
            pageable.sort = sort;
        }

        if (filter) {
            newFilter[filter.column] = filter.filterTerm;
        }

        this.props.requestData(pageable, newFilter);
    }

    rowGetter(index) {
        return {
            ...this.props.car.cars[index]
        };
    }

    onFilterChange({ column, filterTerm }) {
        this.requestData({ filter: { column: column.key, filterTerm } })
    }

    getValidFilterValues(columnId) {
        const values = this.props.car.cars.map(c => c[columnId]);
        return [CarList.columns.find(c => c.key === columnId).name]
            .concat(values.filter((item, i, a) => i == a.indexOf(item)))
    }

    onFilterClear() {
        this.requestData({ filter: {} })
    }

    onSortChange(sortColumn, sortDirection) {
        switch (sortDirection) {
            case 'NONE':
                this.requestData({ sort: { field: 'brand', isAscending: true }});
                break;
            case 'ASC':
                this.requestData({ sort: { field: sortColumn, isAscending: true }});
                break;
            case 'DESC':
                this.requestData({ sort: { field: sortColumn, isAscending: false }});
                break;
        }
    }

    onRowClick() {

    }

    onPageChange(page) {
        this.requestData({ page });
    }

    render() {
        console.log(this.props);

        return (
            <div className="car-list">
                <ReactDataGrid columns={CarList.columns}
                               minHeight={500}
                               rowGetter={this.rowGetter.bind(this)}
                               rowsCount={this.props.car.cars.length}
                               toolbar={<CarListFilter/>}
                               onAddFilter={this.onFilterChange.bind(this)}
                               getValidFilterValues={this.getValidFilterValues.bind(this)}
                               onClearFilters={this.onFilterClear.bind(this)}
                               onGridSort={this.onSortChange.bind(this)}
                               rowSelection={CarList.rowSelectionSettings}
                               onRowClick={this.onRowClick.bind(this)}
                               emptyRowsView={ListLoader}/>

                <div style={{ textAlign: 'center' }}>
                    <ListPaginate maxPage={this.props.car.pageable.totalPages}
                                  currentPage={this.props.car.pageable.number}
                                  setPage={this.onPageChange.bind(this)} />
                </div>

                <ListSpinner isShown={this.props.car.isFetching} />

            </div>
        )
    }
}

CarList.propTypes = {};
