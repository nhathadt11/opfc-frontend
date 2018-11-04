import { all } from 'redux-saga/effects';
import { accountFlow } from '../modules/Account';
import { eventPlannerFlow } from '../modules/EventPlanner';
import { brandProfileFlow } from '../modules/BrandProfile';
import { generalFlow } from '../modules/General';
import { ratingFlow } from '../modules/Rating';
import { bookmarkFlow } from '../modules/Bookmark';

export default function* () {
  yield all([
    accountFlow(),
    eventPlannerFlow(),
    brandProfileFlow(),
    generalFlow(),
    ratingFlow(),
    bookmarkFlow(),
  ]);
}
