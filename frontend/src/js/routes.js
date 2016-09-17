import React from 'react';

import { Route, IndexRoute } from 'react-router';

import App from './containers/app_container';
import Simple from './containers/simple';
import SignIn from './pages/signin';

const routes = (
    <Route path="/" component={App}>
        <IndexRoute component={Simple}/>
        <Route path="/signin" component={SignIn} />
        <Route path="/route" component={Simple} />
    </Route>
);

export default routes;