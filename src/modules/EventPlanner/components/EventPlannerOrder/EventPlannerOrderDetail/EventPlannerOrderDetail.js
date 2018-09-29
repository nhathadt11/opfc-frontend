import React from 'react';
import {
  Row, List, Col, Icon,
} from 'antd';
import './EventPlannerOrderDetail.css';
import {
  OrderDetailEventNameStyled, OrderDetailDateStyled, OrderDetailStatusOverallStyled,
  OrderDetailStatusOverallWrapperStyled, MenuNameStyled, ByBrandNameStyled,
  OverallStyled, OrderDetailStatusWrapperStyled, OrderDetailStatusStyled, OrderItemPriceLabel,
  OrderItemShippingFeeLabel, OrderItemSubTotalLabel, OrderItemTotalLabel,
  OrderItemSubTotalPriceStyled, EventStartTimeStyled,
} from './EventPlannerOrderDetail.styled';

const data = [
  {},
  {},
  {},
];

const meals = [
  { name: 'Chicken Quesadilla' },
  { name: 'Southwestern Shrimp' },
  { name: 'Fresh Cookie Tray' },
  { name: 'Assorted Individual Sodas' },
  { name: 'Meat Lasagna' },
  { name: 'Moussaka' },
];

const EventPlannerOrderDetailLine = () => (
  <Row type="flex" className="opfc-order-detail-item" gutter={24}>
    <Col>
      <MenuNameStyled>Menu Name</MenuNameStyled>
      <ByBrandNameStyled>by Brand Name</ByBrandNameStyled>
      <img src="https://66.media.tumblr.com/a2f0c1471f30dd3e89325ee9f6b86bc8/tumblr_pflxnarapM1sxuwguo1_640.jpg" width={120} alt="Menu" />
    </Col>
    <Col className="opfc-order-detail-meal-list">
      <List
        grid={{ gutter: 16, md: 1, lg: 2 }}
        dataSource={meals}
        renderItem={item => <List.Item>{item.name}</List.Item>}
      />
    </Col>
    <Col className="opfc-order-detail-info">
      <Row>
        <Col span={12}>
          <OrderItemPriceLabel>Price:</OrderItemPriceLabel>
        </Col>
        <Col className="opfc-order-detail-item-price">
          <span>$128,900</span>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <OrderItemShippingFeeLabel>Shipping fee:</OrderItemShippingFeeLabel>
        </Col>
        <Col className="opfc-order-detail-item-price">
          <span>$12</span>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <OrderItemSubTotalLabel>Sub Total:</OrderItemSubTotalLabel>
        </Col>
        <Col className="opfc-order-detail-item-price">
          <OrderItemSubTotalPriceStyled>$128,912</OrderItemSubTotalPriceStyled>
        </Col>
      </Row>
      <OrderDetailStatusWrapperStyled>
        <Icon type="check" theme="outlined" style={{ color: '#52c41a' }} />
        <OrderDetailStatusStyled success>Serviced</OrderDetailStatusStyled>
      </OrderDetailStatusWrapperStyled>
    </Col>
  </Row>
);

const OrderDetailOverall = () => (
  <List.Item>
    <Row type="flex" className="opfc-order-detail-overall">
      <Col className="opfc-order-detail-total">
        <OrderItemTotalLabel>Total:</OrderItemTotalLabel>
        <span>$128,912</span>
      </Col>
    </Row>
  </List.Item>
);

const EventPlannerOrderDetail = () => (
  <div>
    <Row>
      <OrderDetailEventNameStyled>#2632</OrderDetailEventNameStyled>
      <OrderDetailEventNameStyled>
        Event Name <EventStartTimeStyled>Starts at 13:00 PM 2018, Sep 20th</EventStartTimeStyled>
        <OrderDetailStatusOverallWrapperStyled>
          <Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" />
          <OrderDetailStatusOverallStyled success>Serviced</OrderDetailStatusOverallStyled>
          <OverallStyled>Overall</OverallStyled>
        </OrderDetailStatusOverallWrapperStyled>
      </OrderDetailEventNameStyled>
      <OrderDetailDateStyled>Ordered on 2018, Sep 12nd</OrderDetailDateStyled>
    </Row>
    <Row>
      <List
        dataSource={data}
        renderItem={() => <List.Item><EventPlannerOrderDetailLine /></List.Item>}
        footer={<OrderDetailOverall />}
      />
    </Row>
  </div>
);

export default EventPlannerOrderDetail;
