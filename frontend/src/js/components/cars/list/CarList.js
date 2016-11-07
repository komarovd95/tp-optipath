import React from 'react';

import GridList from '../../list/GridList';
import NumericFilter from '../../filters/NumericFilter';
import AutoCompleteFilter from '../../filters/AutoCompleteFilter';
import TextFilter from '../../filters/TextFilter';

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

    static rowGetter(data, selected, i) {
        const rowData = data[i];
        const rowSelected = selected || {};

        return {
            ...rowData,
            brand: rowData.brandName,
            fuelType: rowData.fuelTypeName,
            isSelected: rowData.id === rowSelected.id
        }
    }

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

    componentDidMount() {
        this.props.cacheLoad();
    }

    onRowClick(ignored, rowData) {
        const selectedCar = this.props.selectedCar || {};

        if (rowData.id === selectedCar.id) {
            this.props.enableActions();
        } else {
            this.props.enableActions(rowData, ['change', 'delete']);
        }
    }

    onClearFilters() {
        this.props.resetFilters({ ...this.props.pageable });
    }

    getValidFilterValues(columnId) {
        return [CarList.columns.find(c => c.key === columnId).name]
            .concat(this.props[columnId + 's']
                .map(item => item[columnId + 'Name']))
    }

    render() {
        const {
            cars, selectedCar, pageable, filter, isFetching, resetList, requestData,
            deleteCarIsShown, modalClose, modalAccept,
            actionsEnabled, onChangeClick, onDeleteClick
        } = this.props;

        const toolbar = (
            <CarListFilter actions={actionsEnabled}
                           onChangeClick={onChangeClick}
                           onDeleteClick={onDeleteClick}/>
        );

        return (
            <GridList className="car-list"
                      data={cars}
                      columns={CarList.columns}
                      rowGetter={CarList.rowGetter}
                      selected={selectedCar}
                      toolbar={toolbar}
                      isFetching={isFetching}
                      pageable={{
                          maxPage: pageable.totalPages,
                          currentPage: pageable.number,
                          size: pageable.size
                      }}
                      filter={filter}
                      requestData={requestData}
                      defaultSort={{ field: 'brand', isAscending: true }}
                      deleteModal={{
                          title: 'Удалить автомобиль',
                          isOpen: deleteCarIsShown,
                          message: CarList.message,
                          onModalAccept: modalAccept.bind(null, pageable),
                          onModalClose: modalClose
                      }}
                      onRowClick={this.onRowClick.bind(this)}
                      getValidFilterValues={this.getValidFilterValues.bind(this)}
                      onClearFilters={this.onClearFilters.bind(this, pageable)}
                      resetList={resetList} />
        )
    }
}

CarList.propTypes = {
    cars: React.PropTypes.array.isRequired,
    selectedCar: React.PropTypes.object,
    isFetching: React.PropTypes.bool.isRequired,
    actionsEnabled: React.PropTypes.array.isRequired,
    enableActions: React.PropTypes.func.isRequired,
    onDeleteClick: React.PropTypes.func.isRequired,
    onChangeClick: React.PropTypes.func.isRequired,
    pageable: React.PropTypes.shape({
        totalPages: React.PropTypes.number,
        number: React.PropTypes.number,
        sort: React.PropTypes.shape({
            field: React.PropTypes.string.isRequired,
            isAscending: React.PropTypes.bool.isRequired
        })
    }).isRequired,
    filter: React.PropTypes.shape({
        brand: React.PropTypes.string.isRequired,
        name: React.PropTypes.string.isRequired,
        fuelType: React.PropTypes.string.isRequired,
        fuelConsumption: React.PropTypes.string.isRequired,
        maxVelocity: React.PropTypes.string.isRequired
    }).isRequired,
    deleteCarIsShown: React.PropTypes.bool.isRequired,
    modalAccept: React.PropTypes.func.isRequired,
    modalClose: React.PropTypes.func.isRequired,
    requestData: React.PropTypes.func.isRequired,
    resetList: React.PropTypes.func.isRequired,
    resetFilters: React.PropTypes.func.isRequired,
    cacheLoad: React.PropTypes.func.isRequired
};

CarList.defaultProps = {
    selectedCar: {}
};
