import { combineReducers } from 'redux';

import DataReducer from './reducers/DataReducer';
import SortReducer from './reducers/SortReducer';
import FilterReducer from './reducers/FilterReducer';
import PageableReducer from './reducers/PageableReducer';


export default combineReducers({
    data: DataReducer,
    sort: SortReducer,
    filter: FilterReducer,
    pageable: PageableReducer
});
