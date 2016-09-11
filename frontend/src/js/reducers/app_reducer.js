import { combineReducers } from 'redux';

import auth from './auth_reducer';

const appReducer = combineReducers({ auth });

export default appReducer;
