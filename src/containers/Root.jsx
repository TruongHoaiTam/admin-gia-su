import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import store from '../store';

import Navbar from '../components/Navbar/index';
import HomePage from './HomePage';
import LoginPage from './LoginPage';
import CreateAdminPage from './CreateAdminPage';
import UserListPage from './UserListPage';
import UserDetailPage from './UserDetailPage';
import TagListPage from './TagListPage';
import ContractListPage from './ContractListPage';
import ContractDetailPage from './ContractDetailPage';
import RevenuePage from './RevenuePage';

const Root = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Navbar></Navbar>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/create-admin" component={CreateAdminPage} />
        <Route exact path="/user" component={UserListPage} />
        <Route exact path="/user-detail" component={UserDetailPage} />
        <Route exact path="/tag" component={TagListPage} />
        <Route exact path="/contract" component={ContractListPage} />
        <Route exact path="/contract-detail" component={ContractDetailPage} />
        <Route exact path="/revenue" component={RevenuePage} />
      </Switch>
    </BrowserRouter>
  </Provider>
);

export default Root;
