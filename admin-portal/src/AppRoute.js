import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { AuthenticatedComponent } from '@asgardeo/auth-react';

import Home from './pages/home';
import Login from './pages/login';
import ErrorPage from './pages/error-page';
import Header from './components/header';
import Dashboard from './pages/dashboard';

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
        <Route path="/dashboard">
          <AuthenticatedComponent fallback={<Login />}>
            <Dashboard />
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
