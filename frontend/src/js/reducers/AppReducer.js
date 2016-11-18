import { combineReducers } from 'redux';
import merge from 'lodash/merge';

import { routerReducer } from 'react-router-redux';

import { reducer as formReducer } from 'redux-form';

import { SIGNOUT_SUCCESS } from '../constants/AuthActionTypes';

import {SIGN_OUT} from '../users/auth/actionTypes';
import {ACTIVATE_TAB} from '../profile/actionTypes';

import authReducer from  './AuthReducer';
//import errorReducer from './ErrorReducer';
import tabsReducer from './TabsReducer';
import userReducer from './UserReducer';
import carReducer from './CarReducer';
import carChangeReducer from './CarChangeReducer';
import carCacheReducer from './CarCacheReducer';
import carBrandReducer from './CarBrandReducer';

//import UsersReducer from './users/UsersReducer';
import CarsReducer from './cars/CarsReducer';
import BrandsReducer from './brands/BrandsReducer';

import {UsersReducer} from '../users';
import {ModalReducer} from '../modal';
import {ProfileReducer} from '../profile';
import {NotificationReducer} from '../notifications';


const appReducer = combineReducers({
    auth: authReducer,
    //error: errorReducer,
    tabs: tabsReducer,
    user: userReducer,
    car: carReducer,
    carChange: carChangeReducer,
    carCache: carCacheReducer,
    carBrand: carBrandReducer,

    users: UsersReducer,
    modal: ModalReducer,
    profile: ProfileReducer,
    notifications: NotificationReducer,

    cars: CarsReducer,
    brands: BrandsReducer,
    routing: routerReducer,
    form: formReducer
});

export default function(state, action) {
    if (action.type === SIGN_OUT) {
        state = { routing: state.routing };
    } else if (action.type === ACTIVATE_TAB) {
        state = merge({}, state, action.payload.state);
    }

    return appReducer(state, action);
}
