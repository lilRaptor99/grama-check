import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './pages/home';
import Login from './pages/login';
import Menu from './pages/menu';
import Application from './pages/application';
import CheckStatus from './pages/check-status';
import ErrorPage from './pages/error-page';

import { AuthenticatedComponent } from '@asgardeo/auth-react';

const AppRoute = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/menu">
          <AuthenticatedComponent fallback={<Login />}>
            <Menu />
          </AuthenticatedComponent>
        </Route>
        <Route path="/application">
          <AuthenticatedComponent fallback={<Login />} >
            <Application />
          </AuthenticatedComponent>
        </Route>
        <Route path="/check-status">
          <AuthenticatedComponent fallback={<Login />}>
            <CheckStatus />
          </AuthenticatedComponent>
        </Route>
        <Route path="*">
          <ErrorPage />
        </Route>
        {/* <Route path="/application">
          <Application />
        </Route> */}
      </Switch>
    </Router>
  );
};

export default AppRoute;
