import React from 'react';
import {
  Card, Row, Tooltip, Col, Icon, Modal,
} from 'antd';
import moment from 'moment';
import {
  shape, string, number, func, arrayOf,
} from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { find } from 'lodash';
import {
  EventNameStyled, EventInfoLabelStyled, EventInfoValueStyled, CloseStyled,
} from './EventCard.styled';
import { selectEvent, deleteEventRequest } from '../../../actions/planningFlow';
import { EVENT_STATUS } from '../../../../../constants/AppConstants';

const getEventTypeNameFromId = (id, eventTypes) => {
  const found = find(eventTypes, t => t.id === id);

  return found ? found.eventTypeName : 'N/A';
};

const getEventStatus = (event) => {
  if (!event) return 'N/A';

  if (event.status === EVENT_STATUS.PLANNING) return 'Planning';
  if (event.status === EVENT_STATUS.PLANNED) return 'Planned';

  return 'N/A';
};

const EventCard = ({
  data,
  history: { push },
  selectEventAction,
  eventTypeList,
  deleteEventRequestAction,
}) => {
  const handleEventClick = () => {
    if (data.status === EVENT_STATUS.PLANNING) {
      push(`/profile/event-planner/event/${data.id}`);
      selectEventAction(data);
    }

    if (data.status === EVENT_STATUS.PLANNED) {
      push(`/profile/event-planner/order/${data.orderId}`);
    }
  };
  const isPlanning = data.status === EVENT_STATUS.PLANNING;
  const tooltipMessage = isPlanning ? 'Start picking menus now' : 'View order';
  const handleDeleteEvent = (e) => {
    e.stopPropagation();

    const modal = Modal.confirm({
      title: 'Delete event',
      content: 'Are you sure to delete this event?',
      okText: 'Yes',
      cancelText: 'No',
      onOk: () => { deleteEventRequestAction(data.id); modal.destroy(); },
      maskClosable: true,
    });
  };

  return (
    <Tooltip title={tooltipMessage}>
      <Card
        hoverable
        onClick={handleEventClick}
      >
        <Row>
          <EventNameStyled>{data.eventName}</EventNameStyled>
          {
            isPlanning && <CloseStyled onClick={handleDeleteEvent}><Icon type="close" style={{ float: 'right' }} /></CloseStyled>
          }
        </Row>
        <Row>
          <Col span={8} className="opfc-event-card-label">
            <EventInfoLabelStyled>Status:</EventInfoLabelStyled>
          </Col>
          <Col span={16}>
            <EventInfoValueStyled
              planning={data.status === EVENT_STATUS.PLANNING}
              planned={data.status === EVENT_STATUS.PLANNED}
            >
              {getEventStatus(data)}
            </EventInfoValueStyled>
          </Col>
        </Row>
        <Row>
          <Col span={8} className="opfc-event-card-label">
            <EventInfoLabelStyled>Date:</EventInfoLabelStyled>
          </Col>
          <Col span={16}>
            <EventInfoValueStyled>{moment(data.date).format('YYYY - MM - DD')}</EventInfoValueStyled>
          </Col>
        </Row>
        <Row>
          <Col span={8} className="opfc-event-card-label">
            <EventInfoLabelStyled>From:</EventInfoLabelStyled>
          </Col>
          <Col span={16}>
            <EventInfoValueStyled>{moment(data.startAt).format('HH:mm A')}</EventInfoValueStyled>
          </Col>
        </Row>
        <Row>
          <Col span={8} className="opfc-event-card-label">
            <EventInfoLabelStyled>To:</EventInfoLabelStyled>
          </Col>
          <Col span={16}>
            <EventInfoValueStyled>{moment(data.endAt).format('HH:mm A')}</EventInfoValueStyled>
          </Col>
        </Row>
        <Row>
          <Col span={8} className="opfc-event-card-label">
            <EventInfoLabelStyled>Location:</EventInfoLabelStyled>
          </Col>
          <Col span={16}>
            <EventInfoValueStyled>{`${data.address}, ${data.districtName}, ${data.cityName}`}</EventInfoValueStyled>
          </Col>
        </Row>
        <Row>
          <Col span={8} className="opfc-event-card-label">
            <EventInfoLabelStyled>Budget:</EventInfoLabelStyled>
          </Col>
          <Col span={16}>
            <EventInfoValueStyled>{data.budget}</EventInfoValueStyled>
          </Col>
        </Row>
        <Row>
          <Col span={8} className="opfc-event-card-label">
            <EventInfoLabelStyled>Servings:</EventInfoLabelStyled>
          </Col>
          <Col span={16}>
            <EventInfoValueStyled>{data.servingNumber}</EventInfoValueStyled>
          </Col>
        </Row>
        <Row>
          <Col span={8} className="opfc-event-card-label">
            <EventInfoLabelStyled>Event Type:</EventInfoLabelStyled>
          </Col>
          <Col span={16}>
            <EventInfoValueStyled>
              {getEventTypeNameFromId(data.eventTypeId, eventTypeList)}
            </EventInfoValueStyled>
          </Col>
        </Row>
      </Card>
    </Tooltip>
  );
};

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
  deleteEventRequestAction: func.isRequired,
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
  deleteEventRequestAction: deleteEventRequest,
};

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(EventCard);
