import React from 'react';
import 'antd/dist/antd.css';
import { connect } from 'react-redux';
import { actSaveData } from '../actions/Manage';
import '../index.css';
import { Table } from 'antd';
import { callApiGetAllUser } from '../utils/apiCaller';

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

  componentWillMount() {
    callApiGetAllUser().then(result => {
      let data = [];
      result.data.forEach(item => {
        data.push({
          key: item._id,
          username: item.username,
          email: item.email,
          strategy: item.strategy === undefined ? '' : item.strategy,
          action: 'action'
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
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  data: state.manage.data
});

const mapDispatchToProps = dispatch => ({
  actSaveData: data => dispatch(actSaveData(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(UserTableList);
