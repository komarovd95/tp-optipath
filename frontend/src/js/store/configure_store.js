import { createStore, applyMiddleware, compose } from 'redux';

import promiseMiddleware from 'redux-promise';

import appReducer from '../reducers/AppReducer';

export default function configureStore(initialState) {
    return createStore(appReducer, initialState, getMiddleware());
}

function getMiddleware() {
    const middlewares = applyMiddleware(promiseMiddleware);

    return (process.env.NODE_ENV === 'production')
        ? middlewares
        : compose(middlewares,
            window.devToolsExtension ? window.devToolsExtension() : f => f);
}