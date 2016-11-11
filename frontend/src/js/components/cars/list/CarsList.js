import React from 'react';

import GridList from '../../list/GridList';
import NumericFilter from '../../filters/NumericFilter';
import AutoCompleteFilter from '../../filters/AutoCompleteFilter';
import TextFilter from '../../filters/TextFilter';

export default class CarsList extends React.Component {
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

    static message(car) {
        return (
            <p>
                Вы уверены, что хотите удалить автомобиль
                <b>
                    {car && ` ${car.brand} ${car.name} (${car.fuelType})`}
                </b>?
            </p>
        )
    }

    componentWillMount() {
        this.props.cacheLoad();
    }

    onRowSelect(rowIndex) {
        if (rowIndex === this.props.selectedIndex) {
            this.props.selectRow(-1);
        } else {
            this.props.selectRow(rowIndex);
        }
    }

    getValidFilterValues(columnId) {
        console.log('c', columnId, this.props[columnId + 's']);

        return [CarsList.columns.find(c => c.key === columnId).name]
            .concat(this.props[columnId + 's']
                .map(item => item[columnId + 'Name']))
    }

    render() {
        const {
            cars, selectedIndex, toolbar, isFetching, sort, pageable, filter,
            requestData, resetData, resetFilters,
            modalIsShown, modalClose, modalAccept
        } = this.props;

        return (
            <GridList className="car-list"
                      data={cars}
                      columns={CarsList.columns}
                      selected={selectedIndex}
                      toolbar={toolbar}
                      isFetching={isFetching}
                      defaultSort={{ field: 'brand', direction: 'asc' }}
                      sort={sort}
                      pageable={pageable}
                      filter={filter}
                      requestData={requestData}
                      deleteModal={{
                          title: 'Удалить автомобиль',
                          isOpen: modalIsShown,
                          message: CarsList.message,
                          onModalAccept: modalAccept,
                          onModalClose: modalClose
                      }}
                      onRowClick={this.onRowSelect.bind(this)}
                      getValidFilterValues={this.getValidFilterValues.bind(this)}
                      onClearFilter={resetFilters}
                      resetList={resetData} />
        )
    }
}

CarsList.propTypes = {
    cars: React.PropTypes.array.isRequired,
    brands: React.PropTypes.array, //.isRequired,
    fuelTypes: React.PropTypes.array, //.isRequired,
    selectedIndex: React.PropTypes.number,
    toolbar: React.PropTypes.element.isRequired,
    isFetching: React.PropTypes.bool.isRequired,
    modalIsShown: React.PropTypes.bool.isRequired,
    sort: React.PropTypes.shape({
        field: React.PropTypes.string.isRequired,
        direction: React.PropTypes.string.isRequired
    }).isRequired,
    pageable: React.PropTypes.shape({
        number: React.PropTypes.number,
        size: React.PropTypes.number,
        totalPages: React.PropTypes.number
    }).isRequired,
    filter: React.PropTypes.shape({
        brand: React.PropTypes.string.isRequired,
        name: React.PropTypes.string.isRequired,
        fuelType: React.PropTypes.string.isRequired,
        fuelConsumption: React.PropTypes.string.isRequired,
        maxVelocity: React.PropTypes.string.isRequired
    }).isRequired,
    requestData: React.PropTypes.func.isRequired,
    resetData: React.PropTypes.func.isRequired,
    modalAccept: React.PropTypes.func.isRequired,
    modalClose: React.PropTypes.func.isRequired,
    selectRow: React.PropTypes.func.isRequired,
    resetFilters: React.PropTypes.func.isRequired,
    cacheLoad: React.PropTypes.func.isRequired
};
