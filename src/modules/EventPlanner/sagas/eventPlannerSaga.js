import {
  all, takeEvery, call, put, takeLatest,
} from 'redux-saga/effects';
import { message } from 'antd';
import { isFunction } from 'lodash';
import { CREATE_EVENT_REQUEST, createEventSuccess, fetchEventManyFailure, FETCH_EVENT_MANY_REQUEST, fetchEventManySuccess } from '../actions/event';
import Api from '../../../api/Api';

function* createEvent({ payload: { event, onSuccess } }) {
  try {
    const { data } = yield call(Api.createEvent, event);
    yield put(createEventSuccess(data));

    message.success('Create event successfully!');
    if (isFunction(onSuccess)) onSuccess(data);
  } catch (error) {
    message.error('Could not create Event');
  }
}

function* watchCreateEvent() {
  yield takeEvery(CREATE_EVENT_REQUEST, createEvent);
}

function* fetchEventMany() {
  try {
    const { data } = yield call(Api.fetchEventMany);
    yield put(fetchEventManySuccess(data.events));
  } catch (error) {
    yield put(fetchEventManyFailure(error));
    message.error('Could not fetch events');
  }
}

function* watchFetchEventMany() {
  yield takeLatest(FETCH_EVENT_MANY_REQUEST, fetchEventMany);
}

export default function* eventFlow() {
  yield all([
    watchCreateEvent(),
    watchFetchEventMany(),
  ]);
}
