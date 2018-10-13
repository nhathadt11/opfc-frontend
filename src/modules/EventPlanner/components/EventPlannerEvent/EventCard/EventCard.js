import React from 'react';
import { Card, Row, Tooltip } from 'antd';
import moment from 'moment';
import {
  shape, string, number, func, arrayOf,
} from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { find } from 'lodash';
import { EventNameStyled, EventInfoLabelStyled, EventInfoValueStyled } from './EventCard.styled';
import { selectEvent } from '../../../actions/planningFlow';

const getEventTypeNameFromId = (id, eventTypes) => {
  const found = find(eventTypes, t => t.id === id);

  return found ? found.eventTypeName : 'N/A';
};

const EventCard = ({
  data,
  history: { push },
  selectEventAction,
  eventTypeList,
}) => (
  <Tooltip title="Start picking menus for this event">
    <Card
      hoverable
      onClick={() => {
        push(`/profile/event-planner/event/${data.id}`);
        selectEventAction(data);
      }}
    >
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
        <EventInfoValueStyled>{getEventTypeNameFromId(data.eventTypeId, eventTypeList)}</EventInfoValueStyled>
      </Row>
    </Card>
  </Tooltip>
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
  history: shape({
    push: func.isRequired,
  }).isRequired,
  selectEventAction: func.isRequired,
  eventTypeList: arrayOf(shape({
    id: number,
    eventTypeName: string,
  })).isRequired,
};

const mapStateToProps = state => ({
  eventTypeList: state.generalReducer.eventTypeList,
});

const mapDispatchToProps = {
  selectEventAction: selectEvent,
};

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(EventCard);
