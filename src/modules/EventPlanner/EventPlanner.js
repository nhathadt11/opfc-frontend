import React, { Fragment } from 'react';
import { Switch } from 'react-router-dom';
import { Layout } from 'antd';
import EventPlannerSider from './components/EventPlannerSider/EventPlannerSider';
import EventPlannerAccount from './components/EventPlannerAccount/EventPlannerAccount';
import './EventPlanner.css';
import { EventPlannerTabContentStyled } from './EventPlanner.styled';
import EventPlannerOrder from './components/EventPlannerOrder/EventPlannerOrder';
import EventPlannerAddress from './components/EventPlannerAddress/EventPlannerAddress';
import EventPlannerPayment from './components/EventPlannerPayment/EventPlannerPayment';
import EventPlannerBookmark from './components/EventPlannerBookmark/EventPlannerBookmark';
import EventPlannerEvent from './components/EventPlannerEvent/EventPlannerEvent';
import EventPlanningFlow from './components/EventPlanningFlow/EventPlanningFlow';
import PrivateRoute from '../../components/PrivateRoute/PrivateRoute';

const EventPlannerProfile = () => (
  <Fragment>
    <EventPlannerSider />
    <EventPlannerTabContentStyled>
      <Switch>
        <PrivateRoute path="/profile/event-planner/account" component={EventPlannerAccount} />
        <PrivateRoute path="/profile/event-planner/event" component={EventPlannerEvent} />
        <PrivateRoute path="/profile/event-planner/order" component={EventPlannerOrder} />
        <PrivateRoute path="/profile/event-planner/address" component={EventPlannerAddress} />
        <PrivateRoute path="/profile/event-planner/payment" component={EventPlannerPayment} />
        <PrivateRoute path="/profile/event-planner/bookmark" component={EventPlannerBookmark} />
      </Switch>
    </EventPlannerTabContentStyled>
  </Fragment>
);

const EventPlanner = () => (
  <Layout className="opfc-event-planner">
    <Switch>
      <PrivateRoute exact path="/profile/event-planner/event/create" component={EventPlanningFlow} />
      <PrivateRoute path="/profile/event-planner/event/:id" component={EventPlanningFlow} />
      <PrivateRoute path="/profile/event-planner" component={EventPlannerProfile} />
    </Switch>
  </Layout>
);

export default EventPlanner;
