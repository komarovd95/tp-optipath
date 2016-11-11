import { combineReducers } from 'redux';

import UsersListReducer from './list/UsersListReducer';

export default combineReducers({
    list: UsersListReducer
});