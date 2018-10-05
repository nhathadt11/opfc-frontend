import React from 'react';
import { Card, Row } from 'antd';
import { EventNameStyled, EventInfoLabelStyled, EventInfoValueStyled } from './EventCard.styled';

const EventCard = () => (
  <Card hoverable>
    <Row><EventNameStyled>Event Name</EventNameStyled></Row>
    <Row>
      <EventInfoLabelStyled>Status:</EventInfoLabelStyled>
      <EventInfoValueStyled>Ongoing</EventInfoValueStyled>
    </Row>
    <Row>
      <section>
        <EventInfoLabelStyled>From:</EventInfoLabelStyled>
        <EventInfoValueStyled>Sept, 10th 6:00 pm</EventInfoValueStyled>
      </section>
      <section>
        <EventInfoLabelStyled>To:</EventInfoLabelStyled>
        <EventInfoValueStyled>Sept, 10th 6:00 pm</EventInfoValueStyled>
      </section>
    </Row>
    <Row>
      <EventInfoLabelStyled>Location:</EventInfoLabelStyled>
      <EventInfoValueStyled>Ho Chi Minh city</EventInfoValueStyled>
    </Row>
    <Row>
      <EventInfoLabelStyled>Budget:</EventInfoLabelStyled>
      <EventInfoValueStyled>$34.00</EventInfoValueStyled>
    </Row>
    <Row>
      <EventInfoLabelStyled>Servings:</EventInfoLabelStyled>
      <EventInfoValueStyled>5</EventInfoValueStyled>
    </Row>
    <Row>
      <EventInfoLabelStyled>Event Type:</EventInfoLabelStyled>
      <EventInfoValueStyled>Birthday</EventInfoValueStyled>
    </Row>
  </Card>
);

export default EventCard;
