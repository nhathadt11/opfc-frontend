import React from 'react';
import {
  Row, Col, Button, Icon,
} from 'antd';
import './EventPlannerOrderItem.css';
import {
  LabelStyled, OrderStatusStyled, PriceAndMenuStyled, OrderNoteStyled,
} from './EventPlannerOrderItem.styled';

const EventPlannerOrderItem = () => (
  <Row className="opfc-event-planner-order-item" gutter={24}>
    <Col span={6}>
      <div className="opfc-event-planner-event-name">Event name</div>
      <div className="opfc-event-planner-event-date">2018, Sep 12</div>
      <PriceAndMenuStyled>
        <section><LabelStyled>Price: </LabelStyled>$128,900</section>
        <section><LabelStyled>No. of Menus: </LabelStyled>2</section>
      </PriceAndMenuStyled>
    </Col>
    <Col span={14}>
      <section>
        <Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" />
        <OrderStatusStyled success>Serviced</OrderStatusStyled>
      </section>
      <OrderNoteStyled>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Integer eget ante id urna blandit venenatis in vitae enim.
      </OrderNoteStyled>
    </Col>
    <Col span={4} className="opfc-order-detail-actions">
      <Button shape="circle" type="primary" ghost>
        <Icon type="eye" theme="outlined" />
      </Button>
      <Button shape="circle" type="primary" ghost>
        <Icon type="edit" theme="outlined" />
      </Button>
    </Col>
  </Row>
);

export default EventPlannerOrderItem;
