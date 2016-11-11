import { combineReducers } from 'redux';

import BrandsListReducer from './list/BrandsListReducer';

export default combineReducers({
    list: BrandsListReducer
})