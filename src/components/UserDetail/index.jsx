import React from 'react';
import 'antd/dist/antd.css';
import './style.css';

import { Card } from 'antd';
import { connect } from 'react-redux';
import { actSetCurrentUser } from '../../actions/Detail';

class UserDetail extends React.Component {
  render() {
    const { current_user } = this.props;
    return (
      <div>
        <Card style={{ height: 200 }}>
          <div className="info-avatar">
            <div className="avatar-container">
              <img
                className="avatar"
                src={current_user.avatar}
                alt="avatar"
              ></img>
            </div>
            <div className="short-info">
              <h2>{current_user.fullname}</h2>
              <p>
                <b>Email: </b>
                {current_user.email}
              </p>
              <p>
                <b>SĐT: </b>
                {current_user.phone}
              </p>
              <p>
                <b>Ngày sinh: </b>
                {current_user.birthday.slice(0, 10)}
              </p>
              <p>
                <b>Địa chỉ: </b>
                {current_user.address}
              </p>
            </div>
          </div>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  current_user: state.detail.current_user
});

const mapDispatchToProps = dispatch => ({
  actSetCurrentUser: current_user => dispatch(actSetCurrentUser(current_user))
});

export default connect(mapStateToProps, mapDispatchToProps)(UserDetail);
