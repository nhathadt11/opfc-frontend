import React, { Component } from 'react';
import { Row, Col } from 'antd';
import { compose } from 'redux';
import { connect } from 'react-redux';
import {
  arrayOf, shape, number, func,
} from 'prop-types';
import { map } from 'lodash';
import { EventPlannerTabTitleStyled } from '../../EventPlanner.styled';
import EventCard from './EventCard/EventCard';
import './EventCard/EventCard.css';
import { fetchEventManyRequest } from '../../actions/event';

class EventPlannerEvent extends Component {
  static propTypes = {
    eventList: arrayOf(shape({
      id: number,
    })).isRequired,
    fetchEventManyRequestAction: func.isRequired,
  }

  componentDidMount() {
    const { fetchEventManyRequestAction } = this.props;
    fetchEventManyRequestAction();
  }

  render() {
    const { eventList } = this.props;

    return (
      <div>
        <EventPlannerTabTitleStyled>Event</EventPlannerTabTitleStyled>
        <Row type="flex" gutter={24}>
          {
            map(eventList, (event => (
              <Col md={24} lg={12} xl={8} className="opfc-event-card"><EventCard key={event.id} data={event} /></Col>
            )))
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
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(EventPlannerEvent);
