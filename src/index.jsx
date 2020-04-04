import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import 'purecss/build/pure.css';
import rootReducer from './reducers';
import App from './components/App';

const store = createStore(rootReducer);
const root = document.createElement('div');
root.id = 'root';
document.body.appendChild(root);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
