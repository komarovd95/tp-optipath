import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import {
    brandsListFetch, brandsListSave
} from '../../actions/brands/BrandsListFetchActions';

import { brandsListModalShow } from '../../actions/brands/BrandsListModalActions';

import BrandsListFilter from '../../components/brands/BrandsListFilter';


const getBrands = (state) => state.brands.list.data.brands;
const getSelectedIndex = (state) => state.brands.list.data.selectedIndex;

const getActionsSelector = createSelector(getBrands, getSelectedIndex,
    (brands, selectedIndex) => {
        const selectedBrand = (selectedIndex === -1) ? null : brands[selectedIndex];

        if (brands.length === 0) {
            return ['add'];
        } else if (!selectedBrand) {
            return [];
        } else if (selectedBrand.touched) {
            return ['save', 'delete'];
        } else {
            return ['delete'];
        }
    });

const mapStateToProps = (state) => ({
    actionsEnabled: getActionsSelector(state)
});

const mapDispatchToProps = (dispatch) => ({
    onFilterChange: (filter) => dispatch(brandsListFetch(null, null, filter)),
    onAddClick: (action, brand) => dispatch(brandsListSave(brand, action)),
    onDeleteClick: () => dispatch(brandsListModalShow())
});

export default connect(mapStateToProps, mapDispatchToProps)(BrandsListFilter)
