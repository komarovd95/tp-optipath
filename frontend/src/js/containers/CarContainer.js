import React from 'react';
import { connect } from 'react-redux';

import CarList2 from '../components/cars-list/CarList';
import {
    carList, resetFilters, resetList, enableActions, deleteModalClose, deleteCar,
    carCacheLoad, openCarChange, deleteModalShow
} from '../actions/CarActions';

function mapStateToProps(state) {
    const {
        cars, selectedCar, isFetching, pageable, filter, deleteCarIsShown,
        actionsEnabled
    } = state.car;
    const { brands, fuelTypes } = state.carCache;

    return {
        cars,
        selectedCar,
        isFetching,
        pageable,
        filter,
        deleteCarIsShown,
        actionsEnabled,
        brands,
        fuelTypes
    }
}

function mapDispatchToProps(dispatch) {
    return {
        requestData: (pageable, filter) => dispatch(carList(pageable, filter)),
        resetFilters: (pageable) => {
            dispatch(resetFilters());
            dispatch(carList(pageable))
        },
        resetList: () => dispatch(resetList()),
        enableActions: (selected, actions) =>
            dispatch(enableActions(selected, actions)),
        modalAccept: (pageable, car) => dispatch(deleteCar(pageable, car)),
        modalClose: () => dispatch(deleteModalClose()),
        cacheLoad: () => dispatch(carCacheLoad(false)),
        onDeleteClick: () => dispatch(deleteModalShow()),
        onChangeClick: (action) => dispatch(openCarChange(action))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CarList2);