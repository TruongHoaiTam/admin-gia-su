import React from 'react';
import '../index.css';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { actLoginRequest, actGetUser, actLogout } from '../actions/Auth';
import { actSaveData } from '../actions/Manage';
import ModalAddTag from '../components/ModalAddTag';
import ModalDeleteTag from '../components/ModalDeleteTag';
import TagTableList from '../components/TagTableList';

class TagListPage extends React.Component {
  history = () => {
    const { history } = this.props;
    history.push('/');
    history.push('/tag');
  };

  render() {
    const { username, actGetUser } = this.props;
    actGetUser();
    if (username && username !== undefined) {
      return (
        <div>
          <p className="title">TAG LIST PAGE</p>
          <ModalAddTag history={this.history} />
          <ModalDeleteTag history={this.history} />
          <TagTableList />
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
  err: state.auth.err,

  data: state.manage.data
});

const mapDispatchToProps = dispatch => ({
  actLoginRequest: user => dispatch(actLoginRequest(user)),
  actGetUser: () => dispatch(actGetUser()),
  actLogout: () => dispatch(actLogout()),

  actSaveData: data => dispatch(actSaveData(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(TagListPage);
