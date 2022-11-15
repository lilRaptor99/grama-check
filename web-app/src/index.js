import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from "@asgardeo/auth-react";
import App from './App';

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider
    config={{
      signInRedirectURL: "https://localhost:3000",
      signOutRedirectURL: "https://localhost:3000",
      clientID: "kPd7Cg_4E8hxkmqL0xNnHCoLxh8a",
      baseUrl: "https://api.asgardeo.io/t/azma",
      scope: ["openid", "profile"]
    }}
  >
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </AuthProvider>
);

reportWebVitals();
