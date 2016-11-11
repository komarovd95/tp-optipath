import React from 'react';

import GridList from '../list/GridList';

export default class BrandsList extends React.Component {
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

    onRowSelect(rowIndex) {
        if (rowIndex === this.props.selectedIndex) {
            this.props.selectRow(-1);
        } else {
            this.props.selectRow(rowIndex);
        }
    }

    onRowUpdated({ rowIdx, updated }) {
        this.props.onRowUpdated(rowIdx, updated);
    }

    render() {
        const {
            brands, selectedIndex, toolbar, sort, isFetching, pageable, filter,
            requestData, resetData,
            modalIsShown, modalAccept, modalClose
        } = this.props;

        return (
            <GridList className="brand-list"
                      data={brands}
                      columns={BrandsList.columns}
                      selected={selectedIndex}
                      toolbar={toolbar}
                      isFetching={isFetching}
                      defaultSort={{ field: 'id', isAscending: true }}
                      sort={sort}
                      pageable={pageable}
                      filter={filter}
                      requestData={requestData}
                      deleteModal={{
                          title: 'Удалить марку',
                          isOpen: modalIsShown,
                          message: BrandsList.message,
                          onModalAccept: modalAccept,
                          onModalClose: modalClose
                      }}
                      onRowClick={this.onRowSelect.bind(this)}
                      resetList={resetData}
                      enableCellSelect={true}
                      onRowUpdated={this.onRowUpdated.bind(this)} />
        )
    }
}

BrandsList.propTypes = {
    brands: React.PropTypes.array.isRequired,
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
        brandName: React.PropTypes.string
    }).isRequired,
    requestData: React.PropTypes.func.isRequired,
    resetData: React.PropTypes.func.isRequired,
    selectRow: React.PropTypes.func.isRequired,
    modalAccept: React.PropTypes.func.isRequired,
    modalClose: React.PropTypes.func.isRequired,
    onRowUpdated: React.PropTypes.func.isRequired
};
