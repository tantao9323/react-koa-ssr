import ReactDom from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import { Provider } from 'react-redux';
import 'normalize.css';
import './global.less';
import createApp from './createApp';

/* eslint no-underscore-dangle: 0 */
const { router, store } = createApp(window.__STORE__);

ReactDom.hydrate(
  <Provider store={store}>
    <BrowserRouter>{router}</BrowserRouter>
  </Provider>,
  document.getElementById('app'),
);
