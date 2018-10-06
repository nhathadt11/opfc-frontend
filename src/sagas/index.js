import { all } from 'redux-saga/effects';
import { accountFlow } from '../modules/Account';
import { eventPlannerFlow } from '../modules/EventPlanner';
import { brandProfileFlow } from '../modules/BrandProfile';

export default function* () {
  yield all([
    accountFlow(),
    eventPlannerFlow(),
    brandProfileFlow(),
  ]);
}
