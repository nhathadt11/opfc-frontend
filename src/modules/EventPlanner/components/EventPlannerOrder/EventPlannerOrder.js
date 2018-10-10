import React from 'react';
import { List } from 'antd';
import { Switch } from 'react-router-dom';
import { EventPlannerTabTitleStyled } from '../../EventPlanner.styled';
import EventPlannerOrderItem from './EventPlannerOrderItem/EventPlannerOrderItem';
import EventPlannerOrderDetail from './EventPlannerOrderDetail/EventPlannerOrderDetail';
import PrivateRoute from '../../../../components/PrivateRoute/PrivateRoute';

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
      <PrivateRoute exact path="/profile/event-planner/order" component={EventPlannerOrderList} />
      <PrivateRoute path="/profile/event-planner/order/:id" component={EventPlannerOrderDetail} />
    </Switch>
  </div>
);

export default EventPlannerOrder;
