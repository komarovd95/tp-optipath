import { combineReducers } from 'redux';

import { routerReducer } from 'react-router-redux';

import { reducer as formReducer } from 'redux-form';

import signInReducer from './signin_reducer';
import tabsReducer from './tabs_reducer';

const appReducer = combineReducers({
    signIn: signInReducer,
    tabs: tabsReducer,
    routing: routerReducer,
    form: formReducer
});

export default appReducer;
