import React from 'react';
import { Row, Col, List } from 'antd';
import { shape } from 'prop-types';
import {
  EventPlannerOrderDetailLineStyled, MenuNameStyled, OrderItemPriceLabel, OrderItemShippingFeeLabel,
} from './EventPlannerOrderDetail.styled';

const EventPlannerOrderDetailLine = ({ data }) => (
  <EventPlannerOrderDetailLineStyled>
    <Row>
      <MenuNameStyled>{data.menuName || 'N/A'}</MenuNameStyled>
    </Row>
    <Row type="flex" className="opfc-order-detail-item" gutter={24}>
      <Col>
        <img src="https://66.media.tumblr.com/a2f0c1471f30dd3e89325ee9f6b86bc8/tumblr_pflxnarapM1sxuwguo1_640.jpg" width={80} alt="Menu" />
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
            <OrderItemShippingFeeLabel>Other fee:</OrderItemShippingFeeLabel>
          </Col>
          <Col className="opfc-order-detail-item-price">
            <span>${data.otherFee || 0}</span>
          </Col>
        </Row>
        {/* <Row>
          <Col span={12}>
            <OrderItemSubTotalLabel>Sub Total:</OrderItemSubTotalLabel>
          </Col>
          <Col className="opfc-order-detail-item-price">
            <OrderItemSubTotalPriceStyled>${data.price}</OrderItemSubTotalPriceStyled>
          </Col>
        </Row> */}
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

export default EventPlannerOrderDetailLine;
