import { combineReducers } from 'redux';

import { routerReducer } from 'react-router-redux';

import { reducer as formReducer } from 'redux-form';

import { SIGNOUT_SUCCESS } from '../constants/AuthActionTypes';

import authReducer from  './AuthReducer';
import errorReducer from './ErrorReducer';
import tabsReducer from './TabsReducer';
import userReducer from './UserReducer';
import carReducer from './CarReducer';
import carChangeReducer from './CarChangeReducer';
import carCacheReducer from './CarCacheReducer';
import carBrandReducer from './CarBrandReducer';

const appReducer = combineReducers({
    auth: authReducer,
    error: errorReducer,
    tabs: tabsReducer,
    user: userReducer,
    car: carReducer,
    carChange: carChangeReducer,
    carCache: carCacheReducer,
    carBrand: carBrandReducer,
    routing: routerReducer,
    form: formReducer
});

export default function(state, action) {
    if (action.type === SIGNOUT_SUCCESS) {
        state = { routing: state.routing };
    }

    return appReducer(state, action);
}
