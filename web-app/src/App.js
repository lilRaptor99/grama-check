import React, { useEffect } from "react";
import './assets/styles/index.scss';
import { BrowserRouter as Router } from "react-router-dom";
import { useAuthContext } from "@asgardeo/auth-react";
import AppRoute from './AppRoute';
import Header from './components/header';

const App = () => {
  const { state, getIDToken } = useAuthContext();

  // useEffect(() => {
  //   if (!state?.isAuthenticated) {
  //     return;
  //   }
  //   console.log(state);

  //   getIDToken().then((idToken) => {
  //     localStorage.setItem('token', JSON.stringify(idToken));
  //   }).catch((error) => {
  //     console.log(error);
  //     // Handle the error
  //   })
  // }, [state.isAuthenticated]);

  return (
    <Router>
      <Header />
      <AppRoute />
    </Router>
  );
}

export default App;
