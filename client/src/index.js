import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import { BrowserRouter } from 'react-router-dom'
import { HashRouter } from 'react-router-dom'
import { AuthProvider } from './context/auth';
import { ForcesProvider } from './context/forces';
import { LcProvider } from './context/lc';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
    <ForcesProvider>
      <LcProvider>
        <HashRouter>
          <App />
        </HashRouter>
      </LcProvider>
    </ForcesProvider>
  </AuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
