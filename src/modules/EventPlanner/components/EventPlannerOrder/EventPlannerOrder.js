import React from 'react';
import { List } from 'antd';
import { EventPlannerTabTitleStyled } from '../../EventPlanner.styled';
import EventPlannerOrderItem from './EventPlannerOrderItem/EventPlannerOrderItem';

const data = [
  <EventPlannerOrderItem />,
  <EventPlannerOrderItem />,
  <EventPlannerOrderItem />,
];

const EventPlannerOrder = () => (
  <div>
    <EventPlannerTabTitleStyled>Order</EventPlannerTabTitleStyled>
    <List
      dataSource={data}
      renderItem={item => <List.Item>{item}</List.Item>}
    />
  </div>
);

export default EventPlannerOrder;
