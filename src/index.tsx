import React from 'react';
import ReactDOM from 'react-dom/client';
import { ApiProvider } from '@reduxjs/toolkit/dist/query/react';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { todosApi } from './store';
import './index.scss';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ApiProvider api={todosApi}>
      <App />
    </ApiProvider>
  </React.StrictMode>
);

reportWebVitals();
