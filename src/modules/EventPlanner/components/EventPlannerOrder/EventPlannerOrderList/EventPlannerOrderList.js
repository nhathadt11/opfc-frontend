import React, { Component } from 'react';
import { List } from 'antd';
import { compose } from 'redux';
import { connect } from 'react-redux';
import {
  func, arrayOf, shape, bool,
} from 'prop-types';
import { map } from 'lodash';
import EventPlannerOrderItem from '../EventPlannerOrderItem/EventPlannerOrderItem';
import { fetchEventPlannerOrderManyRequest } from '../../../actions/order';

class EventPlannerOrderList extends Component {
  static propTypes = {
    fetchEventPlannerOrderManyRequestAction: func.isRequired,
    orderList: arrayOf(shape({})).isRequired,
    fetching: bool,
  }

  static defaultProps = {
    fetching: false,
  }

  componentDidMount() {
    const { fetchEventPlannerOrderManyRequestAction } = this.props;
    fetchEventPlannerOrderManyRequestAction();
  }

  render() {
    const { orderList, fetching } = this.props;
    const data = map(orderList, o => (
      <EventPlannerOrderItem id={o.orderNo} orderNumber={o.orderNo} data={o} />
    ));

    return (
      <List
        dataSource={data}
        renderItem={item => <List.Item>{item}</List.Item>}
        loading={fetching}
      />
    );
  }
}

const mapStateToProps = state => ({
  orderList: state.eventPlannerReducer.order.orderList,
  fetching: state.eventPlannerReducer.order.fetching,
});

const mapDispatchToProps = {
  fetchEventPlannerOrderManyRequestAction: fetchEventPlannerOrderManyRequest,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(EventPlannerOrderList);
