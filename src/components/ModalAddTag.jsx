import React from 'react';
import 'antd/dist/antd.css';
import '../index.css';
import { Form, Input, Button, Modal } from 'antd';
import { callApiAddTag } from '../utils/apiCaller';

class AddTag extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],

    visible: false
  };

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleCancel = e => {
    this.setState({
      visible: false
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        return callApiAddTag(values.tag)
          .then(() => {
            const { history } = this.props;
            history();
          })
          .catch(() => {
            const { info } = Modal;
            info({
              title: 'Thông báo',
              content: `Thêm mới thất bại`
            });
          });
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <div>
        <Button type="primary" className="add" onClick={this.showModal}>
          Add
        </Button>
        <Modal
          title="Add Tag"
          visible={this.state.visible}
          onCancel={this.handleCancel}
          okButtonProps={{ style: { display: 'none' } }}
        >
          <Form onSubmit={this.handleSubmit}>
            <Form.Item label={<span>Nhập tag mới</span>}>
              {getFieldDecorator('tag', {})(<Input />)}
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Thêm Tag
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}

const ModalAddTag = Form.create({ name: 'add_tag' })(AddTag);

export default ModalAddTag;
