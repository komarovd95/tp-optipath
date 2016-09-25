import React from 'react';

import { Route, IndexRoute } from 'react-router';

import requireAuthentication from './containers/AuthenticatedComponent';

import AppPage from './pages/App';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import RouteHolder from './pages/route';
import Profile from './pages/profile';
import Simple from './containers/simple';

const routes = (
    <Route path="/" component={AppPage}>
        <IndexRoute component={Simple}/>
        <Route path="/about" component={requireAuthentication(Profile)} />
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
        <Route path="/route" component={RouteHolder} />
        <Route path="/me" component={requireAuthentication(Profile)}/>
    </Route>
);

export default routes;