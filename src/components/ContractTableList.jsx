import React from 'react';
import 'antd/dist/antd.css';
import { connect } from 'react-redux';
import { actSaveData } from '../actions/Manage';
import { actSetCurrentContract } from '../actions/Detail';
import '../index.css';
import { Table, Button, Modal } from 'antd';
import {
  callApiGetAllContract,
  callApiChangeStatusContractAdmin,
  callApiChangeStatusContractUser,
  callApiDeleteContractAdmin,
  callApiDeleteContractUser,
  callApiChangeStatusComplaintAdmin,
  callApiChangeStatusComplaintUser
} from '../utils/apiCaller';

class ContractTableList extends React.Component {
  state = {
    filteredInfo: null,
    sortedInfo: null,

    loading: false,
    visible: false
  };

  handleChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter
    });
  };

  handleDetail = item => {
    const { actSetCurrentContract } = this.props;
    actSetCurrentContract(item);
    const { history } = this.props;
    history('/contract-detail');
  };

  handleChangeStatus = item => {
    return callApiChangeStatusContractAdmin(item).then(result => {
      item.id = result.data.id;
      callApiChangeStatusContractUser(item).then(() => {
        item.status = 'forced terminate';
        const { actSetCurrentContract } = this.props;
        actSetCurrentContract(item);
        const { history } = this.props;
        history('/contract');
      });
    });
  };

  showModal = item => {
    const { actSetCurrentContract } = this.props;
    actSetCurrentContract(item);

    this.setState({
      visible: true
    });
  };

  componentDidMount() {
    callApiGetAllContract().then(result => {
      let data = [];
      result.data.forEach(item => {
        data.push({
          key: item._id,
          learner: item.current_learner.fullname,
          teacher: item.current_teacher.fullname,
          status: item.status,
          action:
            item.status === 'still validate' ? (
              <div>
                <Button type="primary" onClick={() => this.handleDetail(item)}>
                  Xem chi tiết
                </Button>
                <Button
                  type="danger"
                  onClick={() => this.handleChangeStatus(item)}
                >
                  Buộc kết thúc hợp đồng
                </Button>
              </div>
            ) : item.status === 'pending complaint' ? (
              <div>
                <Button type="primary" onClick={() => this.handleDetail(item)}>
                  Xem chi tiết
                </Button>
                <Button type="danger" onClick={() => this.showModal(item)}>
                  Giải quyết khiếu nại
                </Button>
              </div>
            ) : (
              <Button type="primary" onClick={() => this.handleDetail(item)}>
                Xem chi tiết
              </Button>
            )
        });
      });
      const { actSaveData } = this.props;
      actSaveData(data);
    });
  }

  handleOk = item => {
    item.pending_complaint = true;
    this.handleRefund(item);
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 3000);
  };

  handleCancel = item => {
    this.handleFinished(item);
    this.setState({ visible: false });
  };

  handleRefund = item => {
    callApiDeleteContractAdmin(item).then(result => {
      item.id = result.data.id;
      callApiDeleteContractUser(item).then(() => {
        const { history } = this.props;
        history('/contract');
      });
    });
  };

  handleFinished = item => {

    return callApiChangeStatusComplaintAdmin(item).then(result => {
      item.id = result.data.id;
      callApiChangeStatusComplaintUser(item).then(() => {
        item.status = 'finished';
        const { actSetCurrentContract } = this.props;
        actSetCurrentContract(item);
        const { history } = this.props;
        history('/contract');
      });
    });
  };

  render() {
    const { data } = this.props;
    let { sortedInfo, filteredInfo } = this.state;
    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};
    const columns = [
      {
        title: 'Learner',
        dataIndex: 'learner',
        key: 'learner',
        sorter: (a, b) => a.learner.length - b.learner.length,
        sortOrder: sortedInfo.columnKey === 'learner' && sortedInfo.order,
        ellipsis: true
      },
      {
        title: 'Teacher',
        dataIndex: 'teacher',
        key: 'teacher',
        sorter: (a, b) => a.teacher.length - b.teacher.length,
        sortOrder: sortedInfo.columnKey === 'teacher' && sortedInfo.order,
        ellipsis: true
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        filters: [
          { text: 'finished', value: 'finished' },
          { text: 'still validate', value: 'still validate' },
          { text: 'forced terminate', value: 'forced terminate' },
          { text: 'pending complaint', value: 'pending complaint' }
        ],
        filteredValue: filteredInfo.status || null,
        onFilter: (value, record) => record.status.includes(value),
        ellipsis: true
      },
      {
        title: 'Action',
        dataIndex: 'action',
        key: 'action',
        ellipsis: true
      }
    ];

    const { visible, loading } = this.state;
    const { current_contract } = this.props;

    return (
      <div>
        <Modal
          visible={visible}
          title="Giải quyết khiếu nại"
          onOk={() => this.handleOk(current_contract)}
          onCancel={() => this.handleCancel(current_contract)}
          footer={[
            <Button
              key="back"
              onClick={() => this.handleCancel(current_contract)}
            >
              Kết thúc hợp đồng
            </Button>,
            <Button
              key="submit"
              type="primary"
              loading={loading}
              onClick={() => this.handleOk(current_contract)}
            >
              Hoàn tiền
            </Button>
          ]}
        >
          <p>Chọn cách giải quyết?</p>
        </Modal>
        <Table
          columns={columns}
          dataSource={data}
          onChange={this.handleChange}
          className="contract-table-list"
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  data: state.manage.data,
  current_user: state.detail.current_user,
  current_contract: state.detail.current_contract
});

const mapDispatchToProps = dispatch => ({
  actSaveData: data => dispatch(actSaveData(data)),
  actSetCurrentContract: current_contract =>
    dispatch(actSetCurrentContract(current_contract))
});

export default connect(mapStateToProps, mapDispatchToProps)(ContractTableList);
