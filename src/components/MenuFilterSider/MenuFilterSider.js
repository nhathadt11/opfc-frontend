import React, { Fragment } from 'react';
import EventType from './EventType/EventType';
import BudgetRange from './BudgetRange/BudgetRange';
import Location from './Location/Location';
import ServingNumber from './ServingNumber/ServingNumber';

const EventFilterSider = () => (
  <Fragment>
    <EventType />
    <BudgetRange />
    <ServingNumber />
    <Location />
  </Fragment>
);

export default EventFilterSider;
