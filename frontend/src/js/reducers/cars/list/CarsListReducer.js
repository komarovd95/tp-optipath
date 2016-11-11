import { combineReducers } from 'redux';

import CarsListDataReducer from './CarsListDataReducer';
import CarsListPageableReducer from './CarsListPageableReducer';
import CarsListSortReducer from './CarsListSortReducer';
import CarsListFilterReducer from './CarsListFilterReducer';
import CarsListModalReducer from './CarsListModalReducer';

export default combineReducers({
    data: CarsListDataReducer,
    sort: CarsListSortReducer,
    modal: CarsListModalReducer,
    filter: CarsListFilterReducer,
    pageable: CarsListPageableReducer
});