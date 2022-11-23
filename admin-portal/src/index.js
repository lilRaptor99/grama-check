import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from '@asgardeo/auth-react';
import App from './App';
import config from './config';

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider config={config}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </AuthProvider>
);

reportWebVitals();
