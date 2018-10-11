import {
  all, call, takeLatest, put,
} from 'redux-saga/effects';

import { message } from 'antd';
import { parseErrorMessage } from '../../../utils/Utils';
import Api from '../../../api/Api';
import { FETCH_EVENT_TYPE_MANY_REQUEST, fetchEventTypeManySuccess, fetchEventTypeManyFailure } from '../actions/general';

function* fetchEventTypeMany() {
  try {
    const { data } = yield call(Api.fetchEventTypeMany);
    yield put(fetchEventTypeManySuccess(data));
  } catch (error) {
    const errorMessage = parseErrorMessage(error);
    yield put(fetchEventTypeManyFailure(errorMessage));
    message.error(errorMessage);
  }
}

function* watchFetchEventTypeMany() {
  yield takeLatest(FETCH_EVENT_TYPE_MANY_REQUEST, fetchEventTypeMany);
}

export default function* generalFlow() {
  yield all([
    watchFetchEventTypeMany(),
  ]);
}
