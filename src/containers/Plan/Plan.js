import React from 'react';
import { Button, Affix, Tooltip } from 'antd';
import { isEmpty } from 'lodash';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { bool } from 'prop-types';
import { withRouter } from 'react-router-dom';

const Plan = ({ selectedEvent, history }) => (
  !isEmpty(selectedEvent) && (
    <Affix style={{ position: 'fixed', bottom: '50%', right: 70 }}>
      <Tooltip placement="left" title={selectedEvent.eventName}>
        <Button
          icon="form"
          size="large"
          shape="circle"
          type="primary"
          style={{ fontSize: 24, height: 56, width: 56 }}
          onClick={() => history.push(`/profile/event-planner/event/${selectedEvent.id}`)}
        />
      </Tooltip>
    </Affix>
  )
);

Plan.propTypes = {
  eventSelected: bool,
};

Plan.defaultProps = {
  selectedEvent: false,
};

const mapStateToProps = state => ({
  selectedEvent: state.eventPlannerReducer.event.event,
});

export default compose(
  connect(mapStateToProps),
  withRouter,
)(Plan);
