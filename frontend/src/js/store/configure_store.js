import { createStore, combineReducers, applyMiddleware, compose } from 'redux';

import thunkMiddleware from 'redux-thunk'

import appReducer from '../reducers/app_reducer';

export default function configureStore(initialState = {}) {
    return createStore(appReducer, initialState, getMiddleware());
}

function getMiddleware() {
    return (process.env.NODE_ENV === 'production')
        ? applyMiddleware(thunkMiddleware)
        : compose(applyMiddleware(thunkMiddleware),
            window.devToolsExtension ? window.devToolsExtension() : f => f);
}