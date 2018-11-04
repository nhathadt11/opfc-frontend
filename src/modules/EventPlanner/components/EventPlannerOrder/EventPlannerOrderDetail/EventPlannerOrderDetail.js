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
import './EventPlannerOrderDetail.css';
import {
  OrderDetailEventNameStyled, OrderDetailDateStyled, OrderDetailStatusOverallStyled,
  OrderDetailStatusOverallWrapperStyled, MenuNameStyled, ByBrandNameStyled,
  OverallStyled, OrderItemPriceLabel,
  OrderItemShippingFeeLabel, OrderItemSubTotalLabel, OrderItemTotalLabel,
  OrderItemSubTotalPriceStyled, EventStartTimeStyled, EventPlannerOrderDetailLineStyled,
} from './EventPlannerOrderDetail.styled';
import { fetchEventPlannerOrderDetailRequest } from '../../../actions/order';

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
                <OverallStyled>Overall</OverallStyled>
              </OrderDetailStatusOverallWrapperStyled>
            </OrderDetailEventNameStyled>
            <OrderDetailDateStyled>Ordered on {moment.utc(orderDetail.orderAt).format('YYYY, MMM DDD')}</OrderDetailDateStyled>
          </Row>
          <Row>
            <List
              dataSource={orderDetail.orderLineList}
              renderItem={item => (
                <List.Item>
                  <EventPlannerOrderDetailLine data={item} />
                </List.Item>
              )}
              footer={<OrderDetailOverall totalPrice={orderDetail.totalPrice} />}
            />
          </Row>
        </Spin>
      </div>
    );
  }
}

const OrderDetailOverall = ({ totalPrice }) => (
  <List.Item>
    <Row type="flex" className="opfc-order-detail-overall">
      <Col className="opfc-order-detail-total">
        <OrderItemTotalLabel>Total:</OrderItemTotalLabel>
        <span>${totalPrice}</span>
      </Col>
    </Row>
  </List.Item>
);

OrderDetailOverall.propTypes = {
  totalPrice: number,
};

OrderDetailOverall.defaultProps = {
  totalPrice: 0,
};

const EventPlannerOrderDetailLine = ({ data }) => (
  <EventPlannerOrderDetailLineStyled>
    <Row>
      <MenuNameStyled>{data.menuName || 'N/A'}</MenuNameStyled>
      <ByBrandNameStyled>by {data.brandName || 'N/A'}</ByBrandNameStyled>
    </Row>
    <Row type="flex" className="opfc-order-detail-item" gutter={24}>
      <Col>
        <img src="https://66.media.tumblr.com/a2f0c1471f30dd3e89325ee9f6b86bc8/tumblr_pflxnarapM1sxuwguo1_640.jpg" width={120} alt="Menu" />
      </Col>
      <Col className="opfc-order-detail-meal-list">
        <List
          grid={{ gutter: 16, md: 1, lg: 2 }}
          dataSource={data.mealList}
          renderItem={item => <List.Item>{item.name}</List.Item>}
        />
      </Col>
      <Col className="opfc-order-detail-info">
        <Row>
          <Col span={12}>
            <OrderItemPriceLabel>Price:</OrderItemPriceLabel>
          </Col>
          <Col className="opfc-order-detail-item-price">
            <span>${data.price || 0}</span>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <OrderItemShippingFeeLabel>Shipping fee:</OrderItemShippingFeeLabel>
          </Col>
          <Col className="opfc-order-detail-item-price">
            <span>${data.otherFee || 0}</span>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <OrderItemSubTotalLabel>Sub Total:</OrderItemSubTotalLabel>
          </Col>
          <Col className="opfc-order-detail-item-price">
            <OrderItemSubTotalPriceStyled>${data.price}</OrderItemSubTotalPriceStyled>
          </Col>
        </Row>
        {/* <OrderDetailStatusWrapperStyled>
          <Icon type="check" theme="outlined" style={{ color: '#52c41a' }} />
          <OrderDetailStatusStyled success>{data.status}</OrderDetailStatusStyled>
        </OrderDetailStatusWrapperStyled> */}
      </Col>
    </Row>
  </EventPlannerOrderDetailLineStyled>
);

EventPlannerOrderDetailLine.propTypes = {
  data: shape({}).isRequired,
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
