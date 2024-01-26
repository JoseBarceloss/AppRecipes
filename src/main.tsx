import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

ReactDOM
  .createRoot(document.getElementById('root') as HTMLElement)
  .render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  );
