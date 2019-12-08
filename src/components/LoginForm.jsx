import React from 'react';
import { connect } from 'react-redux';
import { Form, Icon, Input, Button, Checkbox, Modal } from 'antd';
import { Redirect } from 'react-router-dom';

import { actLoginRequest, actGetUser, actLogout } from '../actions/Auth';

import 'antd/dist/antd.css';
import '../index.css';

class NormalLoginForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        const { actLoginRequest } = this.props;
        actLoginRequest(values);
      }
    });
  };

  render() {
    const { username, err, actGetUser } = this.props;
    const { getFieldDecorator } = this.props.form;
    actGetUser();

    if (username && username !== undefined) {
      return <Redirect to="/" />;
    }
    if (err === 400) {
      const { info } = Modal;
      info({
        title: 'Thông báo',
        content: `Đăng nhập thất bại`
      });
    }

    return (
      <div>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Form.Item>
            {getFieldDecorator('username', {
              rules: [
                { required: true, message: 'Please input your username!' }
              ]
            })(
              <Input
                prefix={
                  <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                placeholder="Username"
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [
                { required: true, message: 'Please input your Password!' }
              ]
            })(
              <Input
                prefix={
                  <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                type="password"
                placeholder="Password"
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true
            })(<Checkbox>Remember me</Checkbox>)}
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>
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

const LoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
