import React from 'react';
import 'antd/dist/antd.css';
import '../index.css';
import { List, Button, Skeleton, Modal } from 'antd';
import { callApiDeleteTag } from '../utils/apiCaller';

import reqwest from 'reqwest';

const count = 10;
const fakeDataUrl = `http://localhost:3000/tag-list`;

class TagList extends React.Component {
  state = {
    initLoading: true,
    loading: false,
    data: [],
    list: []
  };

  componentDidMount() {
    this.getData(res => {
      this.setState({
        initLoading: false,
        data: res,
        list: res
      });
    });
  }

  getData = callback => {
    reqwest({
      url: fakeDataUrl,
      type: 'json',
      method: 'get',
      contentType: 'application/json',
      success: res => {
        callback(res);
      }
    });
  };

  onLoadMore = () => {
    this.setState({
      loading: true,
      list: this.state.data.concat(
        [...new Array(count)].map(() => ({ loading: true, name: {} }))
      )
    });
    this.getData(res => {
      const data = this.state.data.concat(res);
      this.setState(
        {
          data,
          list: data,
          loading: false
        },
        () => {
          // Resetting window's offsetTop so as to display react-virtualized demo underfloor.
          // In real scene, you can using public method of react-virtualized:
          // https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized
          window.dispatchEvent(new Event('resize'));
        }
      );
    });
  };

  deleteTag = tag => {
    return callApiDeleteTag(tag)
      .then(() => {
        console.log('Xoa');
        /* const { history } = this.props;
        history(); */
      })
      .catch(() => {
        const { info } = Modal;
        info({
          title: 'Thông báo',
          content: `Xóa thất bại`
        });
      });
  };

  render() {
    const { initLoading, loading, list } = this.state;
    const loadMore =
      !initLoading && !loading ? (
        <div
          style={{
            textAlign: 'center',
            marginTop: 12,
            height: 32,
            lineHeight: '32px'
          }}
        >
          <Button onClick={this.onLoadMore}>loading more</Button>
        </div>
      ) : null;

    return (
      <List
        className="demo-loadmore-list"
        loading={initLoading}
        itemLayout="horizontal"
        loadMore={loadMore}
        dataSource={list}
        renderItem={item => (
          <List.Item>
            <Skeleton avatar title={false} loading={item.loading} active>
              <List.Item.Meta
                title={<p href="https://ant.design">{item.tag}</p>}
              />
            </Skeleton>
          </List.Item>
        )}
      />
    );
  }
}

export default TagList;
