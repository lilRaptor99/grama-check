import './assets/styles/index.scss';
import { BrowserRouter as Router } from "react-router-dom";
import AppRoute from './AppRoute';
import Header from './components/header';

const App = () => {
  
  return (
    <Router>
      <Header />
      <AppRoute />
    </Router>
  );
}

export default App;
