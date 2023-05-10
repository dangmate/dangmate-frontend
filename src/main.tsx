import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/reset.css';
import { BrowserRouter } from 'react-router-dom';
import ScrollToTop from './hooks/useScrollTop';
import './styles/font/pretendard.css';
import { worker } from './mocks/browser';

worker.start();
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <ScrollToTop />
    <App />
  </BrowserRouter>
);
