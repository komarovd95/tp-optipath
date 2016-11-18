import { createStore, applyMiddleware, compose } from 'redux';

import thunkMiddleware from 'redux-thunk';

import appReducer from '../reducers/AppReducer';

const store = createStore(appReducer, undefined, getMiddleware());

function getMiddleware() {
    const middlewares = applyMiddleware(thunkMiddleware);

    return (process.env.NODE_ENV === 'production')
        ? middlewares
        : compose(middlewares,
            window.devToolsExtension ? window.devToolsExtension() : f => f);
}

export default store;