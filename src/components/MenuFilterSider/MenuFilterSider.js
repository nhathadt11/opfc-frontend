import React, { Fragment } from 'react';
import EventType from './EventType/EventType';
import BudgetRange from './BudgetRange/BudgetRange';

const EventFilterSider = () => (
  <Fragment>
    <EventType />
    <BudgetRange />
  </Fragment>
);

export default EventFilterSider;
