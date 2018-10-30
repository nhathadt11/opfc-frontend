import React from 'react';
import { Switch } from 'react-router-dom';
import { EventPlannerTabTitleStyled } from '../../EventPlanner.styled';
import EventPlannerOrderDetail from './EventPlannerOrderDetail/EventPlannerOrderDetail';
import PrivateRoute from '../../../../components/PrivateRoute/PrivateRoute';
import EventPlannerOrderList from './EventPlannerOrderList/EventPlannerOrderList';

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
