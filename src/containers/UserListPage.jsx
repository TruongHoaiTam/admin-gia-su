import React from 'react';
import Navbar from '../components/Navbar';
import UserList from '../components/UserList';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { actLoginRequest, actGetUser, actLogout } from '../actions/Auth';

class UserListPage extends React.Component {
  render() {
    const { username, actGetUser } = this.props;
    actGetUser();
    if (username && username !== undefined) {
      return (
        <div>
          <Navbar />
          <p className="title">USER LIST PAGE</p>
          <UserList />
        </div>
      );
    } else {
      return <Redirect to="/" />;
    }
  }
}

const mapStateToProps = state => ({
  username: state.auth.username,
  email: state.auth.email,
  avatar: state.auth.avatar,

  token: state.auth.token,
  err: state.auth.err
});

const mapDispatchToProps = dispatch => ({
  actLoginRequest: user => dispatch(actLoginRequest(user)),
  actGetUser: () => dispatch(actGetUser()),
  actLogout: () => dispatch(actLogout())
});

export default connect(mapStateToProps, mapDispatchToProps)(UserListPage);