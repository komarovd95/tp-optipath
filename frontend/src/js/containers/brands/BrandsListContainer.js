import { connect } from 'react-redux';

import {
    brandsListFetch, brandsListReset, brandsListRowSelect, brandsListRowUpdate
} from '../../actions/brands/BrandsListFetchActions';

import {
    brandsListDeleteBrand, brandsListModalClose
} from '../../actions/brands/BrandsListModalActions';

import BrandsList from '../../components/brands/BrandsList';


const mapStateToProps = (state) => {
    const { data, pageable, filter, sort, modal } = state.brands.list;

    return {
        ...data,
        pageable: {
            ...pageable
        },
        filter: {
            ...filter
        },
        sort: {
            ...sort
        },
        modalIsShown: modal.isShown
    }
};

const mapDispatchToProps = (dispatch) => ({
    requestData: (p, s, f) => dispatch(brandsListFetch(p, s, f)),
    resetData: () => dispatch(brandsListReset()),
    selectRow: (index) => dispatch(brandsListRowSelect(index)),
    modalAccept: () => dispatch(brandsListDeleteBrand()),
    modalClose: () => dispatch(brandsListModalClose()),
    onRowUpdated: (i, brandName) => dispatch(brandsListRowUpdate(i, brandName))
});

export default connect(mapStateToProps, mapDispatchToProps)(BrandsList);