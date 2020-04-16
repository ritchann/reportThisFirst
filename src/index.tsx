import React from 'react';
import ReactDOM from 'react-dom';
import { App } from 'app/app';
import { Provider } from 'react-redux';
import { store } from 'core/store';
import { BrowserRouter } from 'react-router-dom';

import './base.scss';
import 'react-datepicker/dist/react-datepicker.css';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
