import React, { Component } from 'react';
import {
  Row, Col, Button, Icon,
} from 'antd';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  arrayOf, shape, number, func,
} from 'prop-types';
import { map } from 'lodash';
import { EventPlannerTabTitleStyled } from '../../EventPlanner.styled';
import EventCard from './EventCard/EventCard';
import './EventCard/EventCard.css';
import { fetchEventManyRequest } from '../../actions/event';
import { deselectEvent } from '../../actions/planningFlow';

class EventPlannerEvent extends Component {
  static propTypes = {
    eventList: arrayOf(shape({
      id: number,
    })).isRequired,
    fetchEventManyRequestAction: func.isRequired,
    history: shape({
      push: func.isRequired,
    }).isRequired,
    deselectEventAction: func.isRequired,
  }

  componentDidMount() {
    const { fetchEventManyRequestAction } = this.props;
    fetchEventManyRequestAction();
  }

  render() {
    const { eventList, history: { push }, deselectEventAction } = this.props;

    return (
      <div>
        <EventPlannerTabTitleStyled>Event</EventPlannerTabTitleStyled>
        <Row type="flex" gutter={24}>
          {
            map(eventList, (event => (
              <Col key={event.id} md={24} lg={12} xl={8} className="opfc-event-card"><EventCard data={event} /></Col>
            )))
          }
          {
            <Col key="event-card-create" md={24} lg={12} xl={8} className="opfc-event-card">
              <Button
                className="opfc-event-card-create"
                onClick={() => {
                  push('/profile/event-planner/event/create');
                  deselectEventAction();
                }}
              >
                <Icon type="plus" />
              </Button>
            </Col>
          }
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  eventList: state.eventPlannerReducer.event.eventList,
});

const mapDispatchToProps = {
  fetchEventManyRequestAction: fetchEventManyRequest,
  deselectEventAction: deselectEvent,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter,
)(EventPlannerEvent);
