import React from 'react';

import GridList from '../../list/GridList';
import BrandListFilter from './BrandListFilter';

export default class BrandList extends React.Component {
    static columns = [
        {
            key: 'id',
            name: 'ID',
            sortable: true,
            width: 80
        },
        {
            key: 'brandName',
            name: 'Марка',
            sortable: true,
            editable: true
        }
    ];

    static message(data) {
        return (
            <p>
                Вы уверены, что хотите удалить марку
                <b>{data && (' ' + data.brandName)}</b>?
                Все автомобили этой марки также будут удалены
            </p>
        )
    }

    static rowGetter(data, selected, i) {
        const rowData = data[i];
        const rowSelected = selected || {};

        return {
            ...rowData,
            createdAt: new Date(rowData.createdAt).toLocaleString('ru'),
            isSelected: rowData.id === rowSelected.id
        };
    }

    onRowClick(ignored, rowData) {
        const selectedBrand = this.props.selectedBrand || {};

        if (rowData.id === selectedBrand.id) {
            this.props.enableActions();
        } else if (rowData.touched) {
            this.props.enableActions(rowData, ['change', 'delete']);
        } else {
            this.props.enableActions(rowData, ['delete']);
        }
    }


    onFilterChange(filterTerm) {
        this.props.requestData(this.props.pageable, { brandName: filterTerm });
    }

    onRowUpdated({ rowIdx, updated }) {
        this.props.onRowUpdated(rowIdx, updated);
    }

    render() {
        const {
            brands, selectedBrand, isFetching, pageable, requestData, filter,
            resetList, deleteBrandIsShown, modalAccept, modalClose,
            actionsEnabled, onSaveClick, onDeleteClick
        } = this.props;

        const actions = (brands && brands.length == 0)
            ? ['add'].concat(actionsEnabled)
            : actionsEnabled;

        const toolbar = (
            <BrandListFilter actionsEnabled={actions}
                             filter={filter.brandName}
                             onAddClick={onSaveClick}
                             onDeleteClick={onDeleteClick}
                             onFilterChange={this.onFilterChange.bind(this)}
                             placeholder="Марка автомобиля" />
        );

        return (
            <GridList className="brand-list"
                      data={brands}
                      rowGetter={BrandList.rowGetter}
                      columns={BrandList.columns}
                      selected={selectedBrand}
                      toolbar={toolbar}
                      isFetching={isFetching}
                      pageable={{
                          maxPage: pageable.totalPages,
                          currentPage: pageable.number,
                          size: pageable.size
                      }}
                      filter={filter}
                      requestData={requestData}
                      defaultSort={{ field: 'id', isAscending: true }}
                      deleteModal={{
                          title: 'Удалить марку',
                          isOpen: deleteBrandIsShown,
                          message: BrandList.message,
                          onModalAccept: modalAccept.bind(null, pageable, filter),
                          onModalClose: modalClose
                      }}
                      onRowClick={this.onRowClick.bind(this)}
                      resetList={resetList}
                      enableCellSelect={true}
                      onRowUpdated={this.onRowUpdated.bind(this)} />
        )
    }
}

BrandList.propTypes = {
    brands: React.PropTypes.array.isRequired,
    selectedBrand: React.PropTypes.object,
    isFetching: React.PropTypes.bool.isRequired,
    pageable: React.PropTypes.shape({
        totalPages: React.PropTypes.number,
        number: React.PropTypes.number,
        sort: React.PropTypes.shape({
            field: React.PropTypes.string.isRequired,
            isAscending: React.PropTypes.bool.isRequired
        })
    }).isRequired,
    filter: React.PropTypes.shape({
        brandName: React.PropTypes.string
    }).isRequired,
    deleteBrandIsShown: React.PropTypes.bool.isRequired,
    actionsEnabled: React.PropTypes.array.isRequired,
    requestData: React.PropTypes.func.isRequired,
    resetList: React.PropTypes.func.isRequired,
    modalAccept: React.PropTypes.func.isRequired,
    modalClose: React.PropTypes.func.isRequired,
    enableActions: React.PropTypes.func.isRequired,
    onDeleteClick: React.PropTypes.func.isRequired,
    onSaveClick: React.PropTypes.func.isRequired,
    onRowUpdated: React.PropTypes.func.isRequired
};
