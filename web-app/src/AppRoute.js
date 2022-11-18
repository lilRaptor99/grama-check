import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import Home from './pages/home';
import Login from './pages/login';
import Menu from './pages/menu';
import CheckStatus from './pages/check-status';
import ErrorPage from './pages/error-page';
import Application from "./pages/application";

import { AuthenticatedComponent, useAuthContext } from "@asgardeo/auth-react";

const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  // const refreshToken = localStorage.getItem('refreshToken');
  // try {
  //   decode(token);
  //   decode(refreshToken);
  //   console.log([decode(token),decode(refreshToken)])
  //   return true;
  // } catch (error) {
  //   return false;
  // }
  if (token) return true;
  return false;
}

function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/",
            }}
          />
        )
      }
    />
  );
}

const AppRoute = () => {
  const { state, signIn, signOut } = useAuthContext();

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/menu">
          <AuthenticatedComponent fallback={<Login />} >
            <Menu />
          </AuthenticatedComponent>
        </Route>
        <Route path="/apply">
          <AuthenticatedComponent fallback={<Login />} >
            <Application />
          </AuthenticatedComponent>
        </Route>
        <Route path="/check-status">
          <AuthenticatedComponent fallback={<Login />} >
            <CheckStatus />
          </AuthenticatedComponent>
        </Route>
        <Route path="*">
          <ErrorPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default AppRoute;
