import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './pages/home';
import Login from './pages/login';
import Application from './pages/application';
import CheckStatus from './pages/check-status';
import ErrorPage from './pages/error-page';
import Header from './components/header';

import { AuthenticatedComponent } from '@asgardeo/auth-react';

const AppRoute = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/home">
          <AuthenticatedComponent fallback={<Login />}>
            <Home />
          </AuthenticatedComponent>
        </Route>
        <Route path="/application">
          <AuthenticatedComponent fallback={<Login />}>
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
      </Switch>
    </Router>
  );
};

export default AppRoute;
