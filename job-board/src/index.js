import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    //should be release in strictmode if it' every deployed to a production environment
    //disabling strictmode prevents duplicate rerenders in development mode
  //<React.StrictMode>
    <App />
  //</React.StrictMode>
);