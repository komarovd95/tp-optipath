import React from 'react';

import { Route, IndexRoute } from 'react-router';

import AppPage from './pages/app';
import SignIn from './pages/signin';
import RouteHolder from './pages/route';
import Profile from './pages/profile';
import Simple from './containers/simple';

const routes = (
    <Route path="/" component={AppPage}>
        <IndexRoute component={Simple}/>
        <Route path="/about" component={Simple} />
        <Route path="/signin" component={SignIn} />
        <Route path="/route" component={RouteHolder} />
        <Route path="/me" component={Profile} />
    </Route>
);

export default routes;