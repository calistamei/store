import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { PassContext } from './Contexts/UserContext';
import { Provider } from 'react-redux';
import { store } from './redux/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <PassContext>
    <React.StrictMode>
        <Provider store={store}>
          <App />
        </Provider>
    </React.StrictMode>
  </PassContext>
);
