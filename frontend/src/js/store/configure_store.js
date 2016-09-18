import { createStore, applyMiddleware, compose } from 'redux';

import promiseMiddleware from 'redux-promise';

import appReducer from '../reducers/app_reducer';

export default function configureStore(initialState = {}) {
    return createStore(appReducer, initialState, getMiddleware());
}

function getMiddleware() {
    return (process.env.NODE_ENV === 'production')
        ? applyMiddleware(promiseMiddleware)
        : compose(applyMiddleware(promiseMiddleware),
            window.devToolsExtension ? window.devToolsExtension() : f => f);
}