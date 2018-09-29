import React from 'react';
import { List } from 'antd';
import { Route, Switch } from 'react-router-dom';
import { EventPlannerTabTitleStyled } from '../../EventPlanner.styled';
import EventPlannerOrderItem from './EventPlannerOrderItem/EventPlannerOrderItem';
import EventPlannerOrderDetail from './EventPlannerOrderDetail/EventPlannerOrderDetail';

const data = [
  <EventPlannerOrderItem id={1} orderNumber={47362} />,
  <EventPlannerOrderItem id={2} orderNumber={58464} />,
  <EventPlannerOrderItem id={3} orderNumber={94754} />,
];

const EventPlannerOrderList = () => (
  <List
    dataSource={data}
    renderItem={item => <List.Item>{item}</List.Item>}
  />
);

const EventPlannerOrder = () => (
  <div>
    <EventPlannerTabTitleStyled>Order</EventPlannerTabTitleStyled>
    <Switch>
      <Route exact path="/profile/event-planner/order" component={EventPlannerOrderList} />
      <Route path="/profile/event-planner/order/:id" component={EventPlannerOrderDetail} />
    </Switch>
  </div>
);

export default EventPlannerOrder;
