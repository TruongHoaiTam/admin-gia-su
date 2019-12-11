import React from 'react';
import Navbar from '../components/Navbar';
import TagList from '../components/TagList';
import '../index.css';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { actLoginRequest, actGetUser, actLogout } from '../actions/Auth';
import { Input } from 'antd';
import ModalAddTag from '../components/ModalAddTag';
const { Search } = Input;

class TagListPage extends React.Component {
  history = () => {
    const { history } = this.props;
    history.push('/tag-list');
  };
  render() {
    const { username, actGetUser } = this.props;
    actGetUser();
    if (username && username !== undefined) {
      return (
        <div>
          <Navbar />
          <p className="title">TAG LIST PAGE</p>
          <ModalAddTag history={this.history} />
          <Search
            placeholder="Search"
            enterButton="Search"
            size="large"
            onSearch={value => console.log(value)}
            className="tag-search"
          />
          <TagList history={this.history} />
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

export default connect(mapStateToProps, mapDispatchToProps)(TagListPage);
