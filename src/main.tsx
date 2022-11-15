import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/reset.css';
import { BrowserRouter } from 'react-router-dom';
import ScrollToTop from './hooks/useScrollTop';
import { worker } from './mocks/browser';
//
// if (import.meta.env.MODE === 'development') {
//   worker.start();
// }

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
