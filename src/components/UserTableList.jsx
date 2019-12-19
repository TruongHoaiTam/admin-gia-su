import React from 'react';
import 'antd/dist/antd.css';
import { connect } from 'react-redux';
import { actSaveData } from '../actions/Manage';
import { actSetCurrentUser, actChangeStatus } from '../actions/Detail';
import '../index.css';
import { Table, Button } from 'antd';
import { callApiGetAllUser, callApiChangeStatus } from '../utils/apiCaller';

class UserTableList extends React.Component {
  state = {
    filteredInfo: null,
    sortedInfo: null
  };

  handleChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter
    });
  };

  handleDetail = item => {
    const { actSetCurrentUser } = this.props;
    actSetCurrentUser(item);
    const { history } = this.props;
    history();
  };

  handleChangeStatus = item => {
    return callApiChangeStatus(item).then(result => {
      const { actChangeStatus } = this.props;
      actChangeStatus(result.data.status);
    });
  };

  componentDidUpdate() {
    callApiGetAllUser().then(result => {
      let data = [];
      result.data.forEach(item => {
        data.push({
          key: item._id,
          username: item.username,
          email: item.email,
          strategy: item.strategy === undefined ? '' : item.strategy,
          status: item.status,
          action:
            item.status === 'active' ? (
              <div>
                <Button type="primary" onClick={() => this.handleDetail(item)}>
                  Xem chi tiết
                </Button>
                <Button
                  type="danger"
                  onClick={() => this.handleChangeStatus(item)}
                >
                  Khóa tài khoản
                </Button>
              </div>
            ) : (
              <div>
                <Button type="primary" onClick={() => this.handleDetail(item)}>
                  Xem chi tiết
                </Button>
                <Button
                  type="primary"
                  onClick={() => this.handleChangeStatus(item)}
                >
                  Mở tài khoản
                </Button>
              </div>
            )
        });
      });
      const { actSaveData } = this.props;
      actSaveData(data);
    });
  }

  render() {
    const { data } = this.props;
    let { sortedInfo, filteredInfo } = this.state;
    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};
    const columns = [
      {
        title: 'Username',
        dataIndex: 'username',
        key: 'username',
        sorter: (a, b) => a.username.length - b.username.length,
        sortOrder: sortedInfo.columnKey === 'username' && sortedInfo.order,
        ellipsis: true
      },
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
        sorter: (a, b) => a.email.length - b.email.length,
        sortOrder: sortedInfo.columnKey === 'email' && sortedInfo.order,
        ellipsis: true
      },
      {
        title: 'Strategy',
        dataIndex: 'strategy',
        key: 'strategy',
        filters: [
          { text: 'teacher', value: 'teacher' },
          { text: 'learner', value: 'learner' }
        ],
        filteredValue: filteredInfo.strategy || null,
        onFilter: (value, record) => record.strategy.includes(value),
        ellipsis: true
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        filters: [
          { text: 'active', value: 'active' },
          { text: 'inactive', value: 'inactive' }
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
    return (
      <div>
        <Table
          columns={columns}
          dataSource={data}
          onChange={this.handleChange}
          className="user-table-list"
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  data: state.manage.data,
  current_user: state.detail.current_user
});

const mapDispatchToProps = dispatch => ({
  actSaveData: data => dispatch(actSaveData(data)),
  actSetCurrentUser: current_user => dispatch(actSetCurrentUser(current_user)),
  actChangeStatus: status => dispatch(actChangeStatus(status))
});

export default connect(mapStateToProps, mapDispatchToProps)(UserTableList);
