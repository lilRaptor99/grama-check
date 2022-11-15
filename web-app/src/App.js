import './assets/styles/index.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Home from './pages/home';
import Menu from './pages/menu';
import CheckStatus from './pages/check-status';

const App = () => {
  return (
    <Router>
      <h1 className="text-center my-3">Welcome to Grama check!</h1>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/menu">
          <Menu />
        </Route>
        <Route path="/check-status">
          <CheckStatus />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
