import React from 'react';
import { connect } from 'react-redux';

import CarList from '../components/cars-list/CarList';
import { carList, resetFilters, resetList, enableActions } from '../actions/CarActions';

function mapStateToProps(state) {
    return {
        car: state.car
    }
}

function mapDispatchToProps(dispatch) {
    return {
        requestData: (pageable, filter) => dispatch(carList(pageable, filter)),
        resetFilters: () => dispatch(resetFilters()),
        resetList: () => dispatch(resetList()),
        enableActions: (selected, actions) => dispatch(enableActions(selected, actions))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CarList);