import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import configureStore from './logic/configureStore';
import { getInitialState } from './logic/functions';

const store = configureStore(getInitialState());

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);