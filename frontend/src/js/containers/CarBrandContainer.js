import React from 'react';
import { connect } from 'react-redux';

import { brandList } from '../actions/CarActions';
import BrandList from '../components/cars/brands/BrandList';

function mapStateToProps(state) {
    const {
        brands, isFetching, selectedBrand, pageable, filter, actionsEnabled,
        deleteBrandIsShown
    } = state.carBrand;

    return {
        brands,
        isFetching,
        pageable,
        filter,
        selectedBrand,
        actionsEnabled,
        deleteBrandIsShown
    }
}

function mapDispatchToProps(dispatch) {
    return {
        requestData: (pageable, filter) => dispatch(brandList(pageable, filter)),
        resetList: () => console.log('reset'),
        modalAccept: () => console.log('accept'),
        modalClose: () => console.log('close'),
        onDeleteClick: () => console.log('delete')
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BrandList)