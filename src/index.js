/* eslint-disable react/jsx-filename-extension */
/* global document */

import React from 'react';
import ReactDOM from 'react-dom';
import '@/global/languages/i18n';

import App from './App';

const render = (Component) => {
  ReactDOM.render(
    <Component />,
    document.getElementById('root'),
  );
};

render(App);
