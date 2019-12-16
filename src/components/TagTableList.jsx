import React from 'react';
import 'antd/dist/antd.css';
import { Table, Input, Button, Icon } from 'antd';
import Highlighter from 'react-highlight-words';
import { connect } from 'react-redux';
import { actSaveData } from '../actions/Manage';
import '../index.css';
import { callApiGetAllTag } from '../utils/apiCaller';

class TagTableList extends React.Component {
  state = {
    searchText: '',
    searchedColumn: ''
  };

  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            this.handleSearch(selectedKeys, confirm, dataIndex)
          }
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button
          onClick={() => this.handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => (
      <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: text =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ) : (
        text
      )
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex
    });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };

  componentWillMount() {
    callApiGetAllTag().then(result => {
      let data = [];
      result.data.forEach(item => {
        data.push({
          key: item._id,
          tag: item.tag
        });
      });
      const { actSaveData } = this.props;
      actSaveData(data);
    });
  }

  render() {
    const { data } = this.props;
    const columns = [
      {
        title: 'Tag',
        dataIndex: 'tag',
        key: 'tag',
        width: '100%',
        ...this.getColumnSearchProps('tag')
      }
    ];
    return (
      <Table columns={columns} dataSource={data} className="tag-table-list" />
    );
  }
}

const mapStateToProps = state => ({
  data: state.manage.data
});

const mapDispatchToProps = dispatch => ({
  actSaveData: data => dispatch(actSaveData(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(TagTableList);
