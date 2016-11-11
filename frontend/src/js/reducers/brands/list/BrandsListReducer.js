import { combineReducers } from 'redux';

import BrandsListDataReducer from './BrandsListDataReducer';
import BrandsListPageableReducer from './BrandsListPageableReducer';
import BrandsListSortReducer from './BrandsListSortReducer';
import BrandsListFilterReducer from './BrandsListFilterReducer';
import BrandsListModalReducer from './BrandsListModalReducer';

export default combineReducers({
    data: BrandsListDataReducer,
    sort: BrandsListSortReducer,
    modal: BrandsListModalReducer,
    filter: BrandsListFilterReducer,
    pageable: BrandsListPageableReducer
});


