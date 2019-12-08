import React from 'react';
import 'antd/dist/antd.css';
import { Form, Input, Button, Modal } from 'antd';
import Avatar from './Avatar';
import { callApiCreateAdmin } from '../utils/apiCaller';

class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: []
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        if (window.location.pathname === '/register-learner') {
          values.strategy = 'learner';
        } else if (window.location.pathname === '/register-teacher') {
          values.strategy = 'teacher';
        }
        values.avatar = localStorage.getItem('imageUrl');
        return callApiCreateAdmin(values)
          .then(() => {
            const { history } = this.props;
            history();
          })
          .catch(() => {
            const { info } = Modal;
            info({
              title: 'Thông báo',
              content: `Đăng ký thất bại`
            });
          });
      }
      return err;
    });
  };

  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 16,
          offset: 8
        }
      }
    };

    return (
      <div>
        <Form
          {...formItemLayout}
          onSubmit={this.handleSubmit}
          className="register-form"
        >
          <Avatar />
          <Form.Item label="Username">
            {getFieldDecorator('username', {
              rules: [
                {
                  required: true,
                  message: 'Please input your username!',
                  whitespace: true
                }
              ]
            })(<Input />)}
          </Form.Item>
          <Form.Item label="Password" hasFeedback>
            {getFieldDecorator('password', {
              rules: [
                {
                  required: true,
                  message: 'Please input your password!'
                },
                {
                  validator: this.validateToNextPassword
                }
              ]
            })(<Input.Password />)}
          </Form.Item>
          <Form.Item label="Confirm Password" hasFeedback>
            {getFieldDecorator('confirm', {
              rules: [
                {
                  required: true,
                  message: 'Please confirm your password!'
                },
                {
                  validator: this.compareToFirstPassword
                }
              ]
            })(<Input.Password onBlur={this.handleConfirmBlur} />)}
          </Form.Item>
          <Form.Item label="Full Name">
            {getFieldDecorator('fullname', {
              rules: [
                {
                  required: true,
                  message: 'Please input your full name!',
                  whitespace: true
                }
              ]
            })(<Input />)}
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              Create Admin
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

const RegisterForm = Form.create({ name: 'register' })(RegistrationForm);

export default RegisterForm;
