import React from 'react';
import 'antd/dist/antd.css';
import { connect } from 'react-redux';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import { actLoginRequest, actGetUser, actLogout } from '../actions/Auth';
import { Button } from 'antd';

class Navbar extends React.Component {
  render() {
    const { username, actLogout } = this.props;
    let login, logout, create_admin;
    if (username && username !== undefined) {
      logout = (
        <Menu.Item key="logout">
          <Button onClick={actLogout}>Logout</Button>
        </Menu.Item>
      );
      if (username === 'admin') {
        create_admin = (
          <Menu.Item key="create-admin">
            <Link to="/create-admin">Create Admin</Link>
          </Menu.Item>
        );
      }
    } else {
      login = (
        <Menu.Item key="login">
          <Link to="/login">Login</Link>
        </Menu.Item>
      );
    }
    return (
      <Menu mode="horizontal" theme="dark">
        <Menu.Item key="home">
          <Link to="/">Home</Link>
        </Menu.Item>
        {logout}
        {login}
        {create_admin}
      </Menu>
    );
  }
}

const mapStateToProps = state => ({
  username: state.auth.username,
  fullname: state.auth.fullname,
  avatar: state.auth.avatar,

  token: state.auth.token,

  err: state.auth.err
});

const mapDispatchToProps = dispatch => ({
  actLoginRequest: user => dispatch(actLoginRequest(user)),
  actGetUser: () => dispatch(actGetUser()),
  actLogout: () => dispatch(actLogout())
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
