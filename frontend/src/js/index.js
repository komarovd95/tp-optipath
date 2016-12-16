import React from 'react';

import ReactDOM from 'react-dom';

import { Router, browserHistory } from 'react-router';

import { Provider } from 'react-redux';

import { syncHistoryWithStore } from 'react-router-redux';

import configuredStore from './store/configure_store';

import routes from './routes';

import Raven from 'raven-js';

import Perf from 'react-addons-perf';

window.Perf = Perf;

Raven.config('https://026cc57683704de08f419455ae1c98fd@sentry.io/115735').install();

const store = configuredStore;

const history = syncHistoryWithStore(browserHistory, store);

const application = (
    <Provider store={store}>
        <Router history={history} routes={routes} />
    </Provider>
);

ReactDOM.render(application, document.getElementById('root'));