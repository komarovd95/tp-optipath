import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import {
    carsListFetch, carsListReset, carsListRowSelect, carsListResetFilters
} from '../../actions/cars/CarsListFetchActions';

import {
    carsListDeleteUser, carsListModalClose
} from '../../actions/cars/CarsListModalActions';

import { carsCacheLoad } from '../../actions/cars/CarsCacheActions';

import CarsList from '../../components/cars/list/CarsList';


const getCars = (state) => state.cars.list.data.cars;
const getCarsSelector = createSelector(getCars, (cars) => {
    return cars.map(c => ({
        ...c,
        brand: c.brandName,
        fuelType: c.fuelTypeName
    }))
});

const mapStateToProps = (state) => {
    const { data, pageable, filter, sort, modal } = state.cars.list;
    const { brands, fuelTypes } = state.cars.cache;

    return {
        ...data,
        cars: getCarsSelector(state),
        pageable: {
            ...pageable
        },
        filter: {
            ...filter
        },
        sort: {
            ...sort
        },
        modalIsShown: modal.isShown,
        brands,
        fuelTypes
    }
};

const mapDispatchToProps = (dispatch) => ({
    requestData: (p, s, f) => dispatch(carsListFetch(p, s, f)),
    resetData: () => dispatch(carsListReset()),
    selectRow: (index) => dispatch(carsListRowSelect(index)),
    resetFilters: () => dispatch(carsListResetFilters()),
    modalAccept: () => dispatch(carsListDeleteUser()),
    modalClose: () => dispatch(carsListModalClose()),
    cacheLoad: () => dispatch(carsCacheLoad(false))
});

export default connect(mapStateToProps, mapDispatchToProps)(CarsList);