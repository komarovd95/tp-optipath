import React from 'react';
import ReactDataGrid from 'react-data-grid';

import NumericFilter from '../filters/NumericFilter';
import AutoCompleteFilter from '../filters/AutoCompleteFilter';
import TextFilter from '../filters/TextFilter';

import ListLoader from '../list/EmptyList';
import ListPaginate from '../list/ListPaginate';
import ListSpinner from '../list/ListSpinner';

import CarListFilter from '../../containers/CarFilterContainer';
import CarDeleteModal from './CarDeleteModal';

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

    static carEquality(c1, c2) {
        return (c1.brand === c2.brand && c1.name === c2.name
            && c1.fuelType === c2.fuelType)
    }

    constructor() {
        super();
        this.requestData = this.requestData.bind(this);
    }

    componentDidMount() {
        this.props.requestData({});
    }

    componentWillUnmount() {
        this.props.resetList();
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
        const rowData = this.props.car.cars[index];
        const selectedCar = this.props.car.selectedCar || {};

        return {
            ...rowData,
            isSelected: CarList.carEquality(rowData, selectedCar)
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
        this.props.resetFilters();
        this.requestData({});
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

    onRowClick(ignored, rowData) {
        const selectedCar = this.props.car.selectedCar || {};

        if (CarList.carEquality(selectedCar, rowData)) {
            this.props.enableActions();
        } else {
            this.props.enableActions(rowData, ['change', 'delete']);
        }
    }

    onPageChange(page) {
        this.requestData({ page });
    }

    render() {
        const car = this.props.car;

        return (
            <div className="car-list">
                <ReactDataGrid columns={CarList.columns}
                               minHeight={500}
                               rowGetter={this.rowGetter.bind(this)}
                               rowsCount={car.cars.length}
                               toolbar={<CarListFilter/>}
                               onAddFilter={this.onFilterChange.bind(this)}
                               getValidFilterValues={this.getValidFilterValues.bind(this)}
                               onClearFilters={this.onFilterClear.bind(this)}
                               onGridSort={this.onSortChange.bind(this)}
                               rowSelection={CarList.rowSelectionSettings}
                               onRowClick={this.onRowClick.bind(this)}
                               emptyRowsView={ListLoader}/>

                <div style={{ textAlign: 'center' }}>
                    <ListPaginate maxPage={car.pageable.totalPages}
                                  currentPage={car.pageable.number}
                                  setPage={this.onPageChange.bind(this)} />
                </div>

                <ListSpinner isShown={car.isFetching} />

                <CarDeleteModal isOpen={car.deleteCarIsShown}
                                isFetching={car.isFetching}
                                modalClose={this.props.modalClose}
                                modalAccept={this.props.modalAccept.bind(null, car.pageable)}
                                selectedCar={car.selectedCar}/>
            </div>
        )
    }
}

CarList.propTypes = {};
