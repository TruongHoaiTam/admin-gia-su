import React from 'react';
import 'antd/dist/antd.css';
import './style.css';

import { Card, Tag } from 'antd';
import { connect } from 'react-redux';
import { actSetCurrentContract } from '../../actions/Detail';
import { Redirect } from 'react-router-dom';

class ContractDetail extends React.Component {
  render() {
    const { current_contract, username } = this.props;
    const { current_learner, current_teacher, content } = current_contract;
    if (username && username !== undefined) {
      return (
        <div>
          <Card style={{ height: 200 }}>
            <div className="info-avatar">
              <div className="avatar-container">
                <b>Người dạy: </b>
                <img
                  className="avatar"
                  src={current_teacher.avatar}
                  alt="avatar"
                ></img>
              </div>
              <div className="short-info">
                <h2>{current_teacher.fullname}</h2>
                <p>
                  <b>Email: </b>
                  {current_teacher.email}
                </p>
                <p>
                  <b>SĐT: </b>
                  {current_teacher.phone}
                </p>
                <p>
                  <b>Ngày sinh: </b>
                  {current_teacher.birthday.slice(0, 10)}
                </p>
                <p>
                  <b>Địa chỉ: </b>
                  {current_teacher.address}
                </p>
              </div>
            </div>
          </Card>
          <Card style={{ height: 200 }}>
            <div className="info-avatar">
              <div className="avatar-container">
                <b>Người học: </b>
                <img
                  className="avatar"
                  src={current_learner.avatar}
                  alt="avatar"
                ></img>
              </div>
              <div className="short-info">
                <h2>{current_learner.fullname}</h2>
                <p>
                  <b>Email: </b>
                  {current_learner.email}
                </p>
                <p>
                  <b>SĐT: </b>
                  {current_learner.phone}
                </p>
                <p>
                  <b>Ngày sinh: </b>
                  {current_learner.birthday.slice(0, 10)}
                </p>
                <p>
                  <b>Địa chỉ: </b>
                  {current_learner.address}
                </p>
              </div>
            </div>
          </Card>
          <Card style={{ height: 500 }}>
            <div className="content">
              <div className="flex">
                <p>
                  <b>Giá thuê: </b> {content.price_per_hour} VND/giờ
                </p>
              </div>
              <div className="flex">
                <p>
                  <b>Số giờ thuê: </b> 50 giờ
                </p>
              </div>
              <div className="flex">
                <p>
                  <b>Tổng học phí: </b> {content.price_per_hour * 50} VND
                </p>
              </div>
              <div className="flex">
                <p>
                  <b>Khoảng thời gian học: </b> 19h-21h Thứ 2-4-6 hàng tuần
                </p>
              </div>
              <div className="flex">
                <p>
                  <b>Địa chỉ dạy: </b> {content.teaching_address}
                </p>
              </div>
              <div className="flex">
                <b>Môn học: </b>
                <div className="tags">
                  {content.tags.map((item, index) => (
                    <Tag key={index}>{item}</Tag>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>
      );
    } else {
      return <Redirect to="/" />;
    }
  }
}

const mapStateToProps = state => ({
  username: state.auth.username,
  current_contract: state.detail.current_contract
});

const mapDispatchToProps = dispatch => ({
  actSetCurrentContract: current_contract =>
    dispatch(actSetCurrentContract(current_contract))
});

export default connect(mapStateToProps, mapDispatchToProps)(ContractDetail);
