import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import '@/assets/styles/tailwind.less';

ReactDOM.render(
  <BrowserRouter basename='/multiLanguage-client'>
    <App />
  </BrowserRouter>,
  document.getElementById('root'),
);
