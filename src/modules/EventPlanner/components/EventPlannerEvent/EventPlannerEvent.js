import React from 'react';
import { Row, Col } from 'antd';
import { EventPlannerTabTitleStyled } from '../../EventPlanner.styled';
import EventCard from './EventCard/EventCard';
import './EventCard/EventCard.css';

const EventPlannerEvent = () => (
  <div>
    <EventPlannerTabTitleStyled>Event</EventPlannerTabTitleStyled>
    <Row type="flex" gutter={24}>
      {
        Array.from(Array(5)).map((event, index) => (
          <Col md={24} lg={12} xl={8} className="opfc-event-card"><EventCard key={index} /></Col>
        ))
      }
    </Row>
  </div>
);

export default EventPlannerEvent;
