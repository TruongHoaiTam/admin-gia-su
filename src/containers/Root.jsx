import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import store from '../store';

import HomePage from './HomePage';
import LoginPage from './LoginPage';
import CreateAdminPage from './CreateAdminPage';

const Root = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/create-admin" component={CreateAdminPage} />
      </Switch>
    </BrowserRouter>
  </Provider>
);

export default Root;
