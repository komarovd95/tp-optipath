import {combineReducers} from 'redux';

import {UsersListReducer} from './list';
import {UsersAuthReducer} from './auth';
import {UsersProfileReducer} from './profile';
import {UsersChangePassReducer} from './change-pass';

export default combineReducers({
    auth: UsersAuthReducer,
    list: UsersListReducer,
    profile: UsersProfileReducer,
    changePass: UsersChangePassReducer
});
