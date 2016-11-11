import React from 'react';
import { connect } from 'react-redux';

import {
    brandList, resetBrandList, enableBrandActions, deleteBrandShow, deleteBrandClose,
    deleteBrand, updateBrandRow, saveBrand
} from '../actions/CarActions';
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
        resetList: () => dispatch(resetBrandList()),
        enableActions: (selected, actions) =>
            dispatch(enableBrandActions(selected, actions)),
        modalAccept: (pageable, filter, brand) =>
            dispatch(deleteBrand(pageable, filter, brand)),
        modalClose: () => dispatch(deleteBrandClose()),
        onDeleteClick: () => dispatch(deleteBrandShow()),
        onSaveClick: (action, brand) => dispatch(saveBrand(action, brand)),
        onRowUpdated: (i, row) => dispatch(updateBrandRow(i, row))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BrandList)