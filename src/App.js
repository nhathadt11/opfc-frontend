import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import './App.css';
import MainLayout from './containers/MainLayout';
import { sagaMiddleware } from './middlewares';
import sagas from './sagas';
import ErrorPage from './containers/ErrorPage/ErrorPage';

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
          <Switch>
            <Route path="/error" component={ErrorPage} />
            <Route path="/" component={MainLayout} />
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}

sagaMiddleware.run(sagas);

export default App;
