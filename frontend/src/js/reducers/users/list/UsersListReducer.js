import { combineReducers } from 'redux';

import UsersListDataReducer from './UsersListDataReducer';
import UsersListPageableReducer from './UsersListPageableReducer';
import UsersListSortReducer from './UsersListSortReducer';
import UsersListFilterReducer from './UsersListFilterReducer';
import UsersListModalReducer from './UsersListModalReducer';

export default combineReducers({
    data: UsersListDataReducer,
    sort: UsersListSortReducer,
    modal: UsersListModalReducer,
    filter: UsersListFilterReducer,
    pageable: UsersListPageableReducer
});


