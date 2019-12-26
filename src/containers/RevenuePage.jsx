import React from 'react';
import { Form, DatePicker, Button } from 'antd';
import { Chart, Geom, Axis, Tooltip, Coord } from 'bizcharts';
import DataSet from '@antv/data-set';
import { connect } from 'react-redux';
import { actLoginRequest, actGetUser, actLogout } from '../actions/Auth';
import { callApiRevenue } from '../utils/apiCaller';
import moment from 'moment';

class RevenueForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        if (values.date_begin !== undefined && values.date_end !== undefined) {
          let begin = new Date(
            moment(values.date_begin, 'YYYY-MM-DD')
          ).getTime();
          let end = new Date(moment(values.date_end, 'YYYY-MM-DD')).getTime();
          if (begin <= end) {
            const { history } = this.props;
            history(begin, end);
          }
        }
      }
      return err;
    });
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
      <Form
        {...formItemLayout}
        onSubmit={this.handleSubmit}
        className="register-form"
      >
        <Form.Item label="Date begin">
          {getFieldDecorator('date_begin', {})(<DatePicker />)}
        </Form.Item>
        <Form.Item label="Date end">
          {getFieldDecorator('date_end', {})(<DatePicker />)}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Lọc
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const RevenueFilter = Form.create({ name: 'filter' })(RevenueForm);

class RevenuePage extends React.Component {
  state = {
    data: [],
    dataFilter: [],
    date_begin: undefined,
    date_end: undefined
  };

  componentWillMount() {
    callApiRevenue().then(result => {
      this.setState({
        data: result.data
      });
    });
  }

  history = (begin, end) => {
    /* const { history } = this.props;
    history.push('/revenue'); */
    callApiRevenue().then(result => {
      this.setState({
        date_begin: begin,
        date_end: end,
        data: result.data
      });
    });
  };

  render() {
    const { data, date_begin, date_end } = this.state;
    let _data = [];
    data.forEach(item => {
      if (
        _data.length > 0 &&
        item.fullname === _data[_data.length - 1].fullname
      ) {
        if (item.time >= date_begin && item.time <= date_end) {
          _data[_data.length - 1].money += item.money;
        }
      } else {
        if (item.time >= date_begin && item.time <= date_end) {
          _data.push(item);
        }
      }
    });
    const ds1 = new DataSet();
    const dv1 = ds1.createView().source(_data);
    dv1.source(_data).transform({
      type: 'sort',

      callback(a, b) {
        return a.money - b.money > 0;
      }
    });

    let skills = [],
      _dataSkill = [];
    _data.forEach(item => {
      item.tags.forEach(tag => {
        if (skills.indexOf(tag) === -1) {
          skills.push(tag);
        }
      });
    });
    skills.forEach(item => {
      _dataSkill.push({ tag: item, money: 0 });
    });
    _data.forEach(item => {
      skills.forEach((skill, index) => {
        if (item.tags.indexOf(skill) >= 0) {
          _dataSkill[index].money += item.money;
        }
      });
    });
    const ds2 = new DataSet();
    const dv2 = ds2.createView().source(_dataSkill);
    dv2.source(_dataSkill).transform({
      type: 'sort',

      callback(a, b) {
        return a.money - b.money > 0;
      }
    });

    let chart;
    if (date_begin && date_end && date_begin <= date_end) {
      chart = (
        <div>
          <Chart height={400} data={dv1} forceFit>
            <Coord transpose />
            <Axis
              name="fullname"
              label={{
                offset: 12
              }}
            />
            <Axis name="money" />
            <Tooltip />
            <Geom type="interval" position="fullname*money" />
          </Chart>
          <Chart height={400} data={dv2} forceFit>
            <Coord transpose />
            <Axis
              name="tag"
              label={{
                offset: 12
              }}
            />
            <Axis name="money" />
            <Tooltip />
            <Geom type="interval" position="tag*money" />
          </Chart>
        </div>
      );
    }

    const { username } = this.props;
    if (username && username !== undefined) {
      return (
        <div>
          <RevenueFilter history={(begin, end) => this.history(begin, end)} />
          {chart}
        </div>
      );
    }
  }
}

const mapStateToProps = state => ({
  username: state.auth.username,
  email: state.auth.email,
  avatar: state.auth.avatar,

  token: state.auth.token,
  err: state.auth.err,

  data: state.manage.data
});

const mapDispatchToProps = dispatch => ({
  actLoginRequest: user => dispatch(actLoginRequest(user)),
  actGetUser: () => dispatch(actGetUser()),
  actLogout: () => dispatch(actLogout())
});

export default connect(mapStateToProps, mapDispatchToProps)(RevenuePage);
