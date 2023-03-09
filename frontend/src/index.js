import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { PassContext } from './Contexts/UserContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <PassContext>
    <React.StrictMode>
        <App />
    </React.StrictMode>
  </PassContext>
);
