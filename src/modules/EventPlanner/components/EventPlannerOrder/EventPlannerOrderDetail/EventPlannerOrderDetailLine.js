import React from 'react';
import { Row, Col, List } from 'antd';
import { shape } from 'prop-types';
import {
  isEmpty, isArray, isString, split,
} from 'lodash';
import {
  EventPlannerOrderDetailLineStyled, MenuNameStyled, OrderItemPriceLabel, OrderItemShippingFeeLabel,
} from './EventPlannerOrderDetail.styled';
import { MENU_PHOTO_PLACHOLDER } from '../../../../../constants/AppConstants';

const getThumbnailPhoto = ({ photo }) => {
  if (isEmpty(photo)) return MENU_PHOTO_PLACHOLDER;
  if (isArray(photo)) return photo[0];
  if (isString(photo)) return split(photo, ';')[0];

  return MENU_PHOTO_PLACHOLDER;
};

const EventPlannerOrderDetailLine = ({ data }) => (
  <EventPlannerOrderDetailLineStyled>
    <Row>
      <MenuNameStyled>{data.menuName || 'N/A'}</MenuNameStyled>
    </Row>
    <Row type="flex" className="opfc-order-detail-item" gutter={24}>
      <Col>
        <img src={getThumbnailPhoto(data)} width={80} height={80} style={{ objectFit: 'contain' }} alt="Menu" />
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
