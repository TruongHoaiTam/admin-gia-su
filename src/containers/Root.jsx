import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import store from '../store';

import Navbar from '../components/Navbar/index';
import HomePage from './HomePage';
import LoginPage from './LoginPage';
import CreateAdminPage from './CreateAdminPage';
import UserListPage from './UserListPage';
import TagListPage from './TagListPage';

const Root = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Navbar></Navbar>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/create-admin" component={CreateAdminPage} />
        <Route exact path="/user" component={UserListPage} />
        <Route exact path="/tag" component={TagListPage} />
      </Switch>
    </BrowserRouter>
  </Provider>
);

export default Root;
