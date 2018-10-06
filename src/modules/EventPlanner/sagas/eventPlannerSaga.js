import {
  all, takeEvery, call, put,
} from 'redux-saga/effects';
import { message } from 'antd';
import { isFunction } from 'lodash';
import { CREATE_EVENT_REQUEST, createEventSuccess } from '../actions/event';
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

export default function* eventFlow() {
  yield all([
    watchCreateEvent(),
  ]);
}
