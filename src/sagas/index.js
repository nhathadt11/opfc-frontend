import { all } from 'redux-saga/effects';
import { accountFlow } from '../modules/Account';

export default function* () {
  yield all([
    accountFlow(),
  ]);
}
