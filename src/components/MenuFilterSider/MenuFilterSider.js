import React, { Fragment } from 'react';
import EventType from './EventType/EventType';
import BudgetRange from './BudgetRange/BudgetRange';
import Location from './Location/Location';

const EventFilterSider = () => (
  <Fragment>
    <EventType />
    <BudgetRange />
    <Location />
  </Fragment>
);

export default EventFilterSider;
