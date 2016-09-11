import React from 'react';

import ReactDOM from 'react-dom';

import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import { createStore, combineReducers, applyMiddleware } from 'redux';

import { Provider } from 'react-redux';

import thunkMiddleware from 'redux-thunk'

import { routerReducer, syncHistoryWithStore } from 'react-router-redux';

import appReducer from './reducers/app_reducer';

import App from './containers/app';
import Simple from './containers/simple';
import LoginForm from './containers/login_form';

const store = createStore(combineReducers({ appReducer, routing: routerReducer }), applyMiddleware(thunkMiddleware));

const history = syncHistoryWithStore(browserHistory, store);

const application = (
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={App}>
                <IndexRoute component={Simple}/>
                <Route path="/signin" component={LoginForm} />
                <Route path="/signup" component={LoginForm} />
                <Route path="/route" component={Simple} />
            </Route>
            <Route name="signer" path="/signin" handler={App} />
        </Router>
    </Provider>
);

ReactDOM.render(application, document.getElementById('root'));