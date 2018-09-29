import React from 'react';
import {
  Row, Col, Button, Icon,
} from 'antd';
import { withRouter } from 'react-router-dom';
import { shape, func, number } from 'prop-types';
import './EventPlannerOrderItem.css';
import {
  LabelStyled, OrderStatusStyled, PriceAndMenuStyled, OrderNoteStyled, EventDateStyled, ValueStyled,
} from './EventPlannerOrderItem.styled';

const EventPlannerOrderItem = ({ history, id }) => (
  <Row className="opfc-event-planner-order-item" gutter={24}>
    <Col span={6}>
      <div className="opfc-event-planner-event-name">Event name</div>
      <div className="opfc-event-planner-event-date">Ordered on 2018, Sep 12</div>
      <PriceAndMenuStyled>
        <section><LabelStyled>Price: </LabelStyled><ValueStyled>$128,900</ValueStyled></section>
        <section><LabelStyled>No. of Menus: </LabelStyled><ValueStyled>2</ValueStyled></section>
      </PriceAndMenuStyled>
    </Col>
    <Col span={14}>
      <section>
        <Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" />
        <OrderStatusStyled success>Serviced</OrderStatusStyled>
        <EventDateStyled>on 2018, Sep 22 at 12:00 pm</EventDateStyled>
      </section>
      <OrderNoteStyled>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Integer eget ante id urna blandit venenatis in vitae enim.
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
};

export default withRouter(EventPlannerOrderItem);
