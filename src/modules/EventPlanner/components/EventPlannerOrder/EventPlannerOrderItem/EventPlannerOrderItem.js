import React from 'react';
import {
  Row, Col, Button, Icon,
} from 'antd';
import { withRouter } from 'react-router-dom';
import { shape, func, number } from 'prop-types';
import moment from 'moment';
import './EventPlannerOrderItem.css';
import {
  LabelStyled, OrderStatusStyled, PriceAndMenuStyled, OrderNoteStyled, EventDateStyled, ValueStyled,
} from './EventPlannerOrderItem.styled';

const EventPlannerOrderItem = ({ history, id, data }) => (
  <Row className="opfc-event-planner-order-item" gutter={24}>
    <Col span={6}>
      <div className="opfc-event-planner-event-name">{data.eventName}</div>
      <div className="opfc-event-planner-event-date">Ordered on {moment.utc(data.orderAt).format('YYYY, MMM DD')}</div>
      <PriceAndMenuStyled>
        <section>
          <LabelStyled>Price: </LabelStyled>
          <ValueStyled>${data.totalPrice}</ValueStyled>
        </section>
        <section>
          <LabelStyled>No. of Menus: </LabelStyled>
          <ValueStyled>{data.menuNumber || 0}</ValueStyled>
        </section>
      </PriceAndMenuStyled>
    </Col>
    <Col span={14}>
      <section>
        <Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" />
        <OrderStatusStyled success>{data.orderStatus}</OrderStatusStyled>
        <EventDateStyled>on {moment.utc(data.startAt).format('YYYY, MMM DD [at] HH:mm A')}</EventDateStyled>
      </section>
      <OrderNoteStyled>
        {data.note || 'N/A'}
      </OrderNoteStyled>
    </Col>
    <Col span={4} className="opfc-order-detail-actions">
      <Button shape="circle" type="primary" ghost onClick={() => history.push(`/profile/event-planner/order/${id}`)}>
        <Icon type="eye" theme="outlined" />
      </Button>
      <Button shape="circle" type="primary" ghost>
        <Icon type="edit" theme="outlined" />
      </Button>
    </Col>
  </Row>
);

EventPlannerOrderItem.propTypes = {
  history: shape({
    push: func.isRequired,
  }).isRequired,
  id: number.isRequired,
  data: shape({}).isRequired,
};

export default withRouter(EventPlannerOrderItem);
