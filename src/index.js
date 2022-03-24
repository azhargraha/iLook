require('file-loader?name=[name].[ext]!./index.html');

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './_reset.scss';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
