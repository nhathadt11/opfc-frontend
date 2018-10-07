import React from 'react';
import { Card, Row } from 'antd';
import moment from 'moment';
import { shape, string, number } from 'prop-types';
import { EventNameStyled, EventInfoLabelStyled, EventInfoValueStyled } from './EventCard.styled';

const EventCard = ({ data }) => (
  <Card hoverable>
    <Row><EventNameStyled>{data.eventName}</EventNameStyled></Row>
    <Row>
      <EventInfoLabelStyled>Status:</EventInfoLabelStyled>
      <EventInfoValueStyled>Ongoing</EventInfoValueStyled>
    </Row>
    <Row>
      <section>
        <EventInfoLabelStyled>From:</EventInfoLabelStyled>
        <EventInfoValueStyled>{moment(data.startAt).format('lll')}</EventInfoValueStyled>
      </section>
      <section>
        <EventInfoLabelStyled>To:</EventInfoLabelStyled>
        <EventInfoValueStyled>{moment(data.endAt).format('lll')}</EventInfoValueStyled>
      </section>
    </Row>
    <Row>
      <EventInfoLabelStyled>Location:</EventInfoLabelStyled>
      <EventInfoValueStyled>{`${data.address}, ${data.district}, ${data.district}, ${data.ward}`}</EventInfoValueStyled>
    </Row>
    <Row>
      <EventInfoLabelStyled>Budget:</EventInfoLabelStyled>
      <EventInfoValueStyled>${data.budget}</EventInfoValueStyled>
    </Row>
    <Row>
      <EventInfoLabelStyled>Servings:</EventInfoLabelStyled>
      <EventInfoValueStyled>{data.servingNumber}</EventInfoValueStyled>
    </Row>
    <Row>
      <EventInfoLabelStyled>Event Type:</EventInfoLabelStyled>
      <EventInfoValueStyled>{data.eventType}</EventInfoValueStyled>
    </Row>
  </Card>
);

EventCard.propTypes = {
  data: shape({
    id: number,
    eventName: string,
    startAt: string,
    endAt: string,
    address: string,
    city: string,
    district: string,
    ward: string,
    budget: number,
    servingNumber: number,
    description: string,
  }).isRequired,
};

export default EventCard;
