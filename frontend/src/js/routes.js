import React from 'react';
import {Route, IndexRoute} from 'react-router';
import store from './store/configure_store';
import {signIn} from './users/auth/actions';
import RequireAuth from './users/auth/components/AuthenticatedComponent';

import AppPage from './pages/App';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import RouteHolder from './pages/route';
import Profile from './pages/Profile';
import Simple from './containers/simple';

const routes = (
    <Route path="/" component={AppPage} onEnter={() => store.dispatch(signIn())}>
        <IndexRoute component={Simple}/>
        <Route path="/about" component={RequireAuth(Profile)} />
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
        <Route path="/route" component={RouteHolder} />
        <Route path="/me" component={RequireAuth(Profile)}/>
        <Route path="/faq" component={Simple} />
    </Route>
);

export default routes;