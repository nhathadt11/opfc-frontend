import React, { Component } from 'react';
import {
  Row, List, Col, Icon, Spin,
} from 'antd';
import { compose } from 'redux';
import { connect } from 'react-redux';
import {
  shape, func, number, string, oneOfType, bool,
} from 'prop-types';
import moment from 'moment';
import { withRouter } from 'react-router-dom';
import { groupBy, map, reduce } from 'lodash';
import './EventPlannerOrderDetail.css';
import {
  OrderDetailEventNameStyled, OrderDetailDateStyled, OrderDetailStatusOverallStyled,
  OrderDetailStatusOverallWrapperStyled, OverallStyled,
  EventStartTimeStyled, ByBrandNameStyled, OrderItemSubTotalLabel,
} from './EventPlannerOrderDetail.styled';
import { fetchEventPlannerOrderDetailRequest } from '../../../actions/order';
import EventPlannerOrderDetailLine from './EventPlannerOrderDetailLine';

class EventPlannerOrderDetail extends Component {
  static propTypes = {
    orderDetail: shape({}).isRequired,
    fetchEventPlannerOrderDetailRequestAction: func.isRequired,
    match: shape({
      params: shape({
        id: oneOfType([string, number]),
      }),
    }).isRequired,
    fetching: bool,
  }

  static defaultProps = {
    fetching: false,
  }

  componentDidMount() {
    const {
      fetchEventPlannerOrderDetailRequestAction,
      match: { params: { id } },
    } = this.props;

    fetchEventPlannerOrderDetailRequestAction(id);
  }

  render() {
    const { orderDetail, fetching } = this.props;
    const orderLineListByBrandName = groupBy(orderDetail.orderLineList, ol => ol.brandName);

    return (
      <div className="opfc-order-detail-container">
        <Spin spinning={fetching}>
          <Row>
            <OrderDetailEventNameStyled>#{orderDetail.orderNo}</OrderDetailEventNameStyled>
            <OrderDetailEventNameStyled>
              {orderDetail.eventName}
              <EventStartTimeStyled>Starts at {moment.utc(orderDetail.startAt).format('HH:mm A YYYY, MMM DD')}</EventStartTimeStyled>
              <OrderDetailStatusOverallWrapperStyled>
                <Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" />
                <OrderDetailStatusOverallStyled success>{orderDetail.orderStatus || 'N/A'}</OrderDetailStatusOverallStyled>
                {/* <OverallStyled>Overall</OverallStyled> */}
              </OrderDetailStatusOverallWrapperStyled>
            </OrderDetailEventNameStyled>
            <OrderDetailDateStyled>Ordered on {moment.utc(orderDetail.orderAt).format('YYYY, MMM DDD')}</OrderDetailDateStyled>
          </Row>
          <Row>
            {
              map(orderLineListByBrandName, (ol, brandName) => (
                <List
                  key={brandName}
                  dataSource={ol}
                  renderItem={item => (
                    <List.Item>
                      <EventPlannerOrderDetailLine data={item} />
                    </List.Item>
                  )}
                  header={(
                    <ByBrandNameStyled>
                      {brandName}
                      <span style={{ float: 'right' }}>
                        <a href="javascript:;" style={{ fontSize: '14px' }}>Mark as Serviced</a>
                      </span>
                    </ByBrandNameStyled>)}
                  bordered={false}
                  footer={(
                    <OrderDetailSubTotal
                      totalPrice={reduce(ol, (acc, cur) => acc + cur.price, 0)}
                    />)
                  }
                />
              ))
            }
          </Row>
          <Row type="flex" className="opfc-order-detail-total">
            <Col className="opfc-order-detail-total-overall">
              <OrderItemSubTotalLabel>Total:</OrderItemSubTotalLabel>
              <span>${orderDetail.totalPrice}</span>
            </Col>
          </Row>
        </Spin>
      </div>
    );
  }
}

const OrderDetailSubTotal = ({ totalPrice }) => (
  <List.Item>
    <Row type="flex" className="opfc-order-detail-subtotal">
      <Col className="opfc-order-detail-subtotal-inner">
        <OrderItemSubTotalLabel>Sub Total:</OrderItemSubTotalLabel>
        <span>${totalPrice}</span>
      </Col>
    </Row>
  </List.Item>
);

OrderDetailSubTotal.propTypes = {
  totalPrice: number,
};

OrderDetailSubTotal.defaultProps = {
  totalPrice: 0,
};

const mapStateToProps = state => ({
  orderDetail: state.eventPlannerReducer.order.orderDetail,
  fetching: state.eventPlannerReducer.order.fetchingOrderDetail,
});

const mapDispatchToProps = {
  fetchEventPlannerOrderDetailRequestAction: fetchEventPlannerOrderDetailRequest,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter,
)(EventPlannerOrderDetail);
