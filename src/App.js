import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import './App.css';
import MainLayout from './containers/MainLayout';
import { sagaMiddleware } from './middlewares';
import sagas from './sagas';

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <MainLayout />
    </BrowserRouter>
  </Provider>
);

sagaMiddleware.run(sagas);

export default App;
