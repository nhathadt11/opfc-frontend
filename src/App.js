import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import './App.css';
import MainLayout from './containers/MainLayout';
import { sagaMiddleware } from './middlewares';
import sagas from './sagas';

class App extends Component {
  componentDidMount() {
    const spinner = document.querySelector('.spinner');
    if (spinner) {
      spinner.parentNode.removeChild(spinner);
    }
  }

  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <MainLayout />
        </BrowserRouter>
      </Provider>
    );
  }
}

sagaMiddleware.run(sagas);

export default App;
