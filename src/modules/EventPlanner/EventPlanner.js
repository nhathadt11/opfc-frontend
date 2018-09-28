import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Layout } from 'antd';
import EventPlannerSider from './components/EventPlannerSider/EventPlannerSider';
import EventPlannerAccount from './components/EventPlannerAccount/EventPlannerAccount';
import './EventPlanner.css';
import { EventPlannerTabContentStyled } from './EventPlanner.styled';

const EventPlanner = () => (
  <Layout className="opfc-event-planner">
    <EventPlannerSider />
    <EventPlannerTabContentStyled>
      <Switch>
        <Route path="/profile/event-planner/account" component={EventPlannerAccount} />
      </Switch>
    </EventPlannerTabContentStyled>
  </Layout>
);

export default EventPlanner;
