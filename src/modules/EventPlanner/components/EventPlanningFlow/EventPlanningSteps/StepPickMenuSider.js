import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import {
  shape, arrayOf, number, string,
} from 'prop-types';
import { find } from 'lodash';
import moment from 'moment';
import {
  SiderItemTitleStyled, SiderItemValueStyled,
  StepPickMenuSiderStyled, StepPickMenuSiderItemStyled,
} from './StepMenuSider.styled';

const StepPickMenuSider = ({ selectedEvent, eventTypeList }) => {
  const foundEvent = find(eventTypeList, e => e.id === selectedEvent.eventTypeId);

  return (
    <StepPickMenuSiderStyled>
      <StepPickMenuSiderItemStyled>
        <SiderItemTitleStyled>Event Name</SiderItemTitleStyled>
        <SiderItemValueStyled>{selectedEvent.eventName}</SiderItemValueStyled>
      </StepPickMenuSiderItemStyled>
      <StepPickMenuSiderItemStyled>
        <SiderItemTitleStyled>Event Type</SiderItemTitleStyled>
        <SiderItemValueStyled>
          {
            foundEvent ? foundEvent.eventTypeName : 'N/A'
          }
        </SiderItemValueStyled>
      </StepPickMenuSiderItemStyled>
      <StepPickMenuSiderItemStyled>
        <SiderItemTitleStyled>Budget</SiderItemTitleStyled>
        <SiderItemValueStyled>{selectedEvent.budget}</SiderItemValueStyled>
      </StepPickMenuSiderItemStyled>
      <StepPickMenuSiderItemStyled>
        <SiderItemTitleStyled>Serving Number</SiderItemTitleStyled>
        <SiderItemValueStyled>{selectedEvent.servingNumber}</SiderItemValueStyled>
      </StepPickMenuSiderItemStyled>
      <StepPickMenuSiderItemStyled>
        <SiderItemTitleStyled>Time Range</SiderItemTitleStyled>
        <SiderItemValueStyled>
          { moment(selectedEvent.startAt).format('HH:mm A') } - { moment(selectedEvent.endAt).format('HH:mm A') }
        </SiderItemValueStyled>
      </StepPickMenuSiderItemStyled>
      <StepPickMenuSiderItemStyled>
        <SiderItemTitleStyled>Address</SiderItemTitleStyled>
        <SiderItemValueStyled>{selectedEvent.address}</SiderItemValueStyled>
      </StepPickMenuSiderItemStyled>
    </StepPickMenuSiderStyled>
  );
};

StepPickMenuSider.propTypes = {
  selectedEvent: shape({}).isRequired,
  eventTypeList: arrayOf(shape({
    id: number,
    eventTypeName: string,
  })).isRequired,
};

const mapStateToProps = state => ({
  selectedEvent: state.eventPlannerReducer.event.event,
  eventTypeList: state.generalReducer.eventTypeList,
});

export default compose(
  connect(mapStateToProps),
)(StepPickMenuSider);
