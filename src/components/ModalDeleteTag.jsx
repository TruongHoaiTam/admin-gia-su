import React from 'react';
import 'antd/dist/antd.css';
import '../index.css';
import { Form, Input, Button, Modal } from 'antd';
import { callApiDeleteTag } from '../utils/apiCaller';

class DeleteTag extends React.Component {
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
        return callApiDeleteTag(values.tag)
          .then(() => {
            const { history } = this.props;
            history();
          })
          .catch(() => {
            const { info } = Modal;
            info({
              title: 'Thông báo',
              content: `Xóa thất bại`
            });
          });
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <div>
        <Button type="danger" className="delete" onClick={this.showModal}>
          Delete
        </Button>
        <Modal
          title="Delete Tag"
          visible={this.state.visible}
          onCancel={this.handleCancel}
          okButtonProps={{ style: { display: 'none' } }}
        >
          <Form onSubmit={this.handleSubmit}>
            <Form.Item label={<span>Nhập tag muốn xóa</span>}>
              {getFieldDecorator('tag', {})(<Input />)}
            </Form.Item>

            <Form.Item>
              <Button type="danger" htmlType="submit">
                Xóa Tag
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}

const ModalDeleteTag = Form.create({ name: 'delete_tag' })(DeleteTag);

export default ModalDeleteTag;
