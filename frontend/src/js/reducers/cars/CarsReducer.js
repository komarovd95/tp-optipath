import { combineReducers } from 'redux';

import CarsListReducer from './list/CarsListReducer';
import CarsFormReducer from './form/CarsFormReducer';
import CarsCacheReducer from './cache/CarsCacheReducer';

export default combineReducers({
    list: CarsListReducer,
    form: CarsFormReducer,
    cache: CarsCacheReducer
});