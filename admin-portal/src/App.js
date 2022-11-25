import React from 'react';
import './assets/styles/index.scss';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoute from './AppRoute';

const App = () => {
  return (
    <Router>
      <AppRoute />
    </Router>
  );
};

export default App;
