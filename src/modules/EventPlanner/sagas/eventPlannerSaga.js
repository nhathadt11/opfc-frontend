import {
  all, takeEvery, call, put, takeLatest, select,
} from 'redux-saga/effects';
import { message } from 'antd';
import { isFunction } from 'lodash';
import {
  CREATE_EVENT_REQUEST, createEventSuccess, fetchEventManyFailure,
  FETCH_EVENT_MANY_REQUEST, fetchEventManySuccess, createEventFailure,
} from '../actions/event';
import Api from '../../../api/Api';
import { FETCH_SUGGESTED_MENU_MANY_REQUEST, fetchSuggestedMenuManyFailure, fetchSuggestedMenuManySuccess } from '../actions/planningFlow';
import { parseErrorMessage } from '../../../utils/Utils';

const getUserId = state => state.accountReducer.account.account.user.id;

function* createEvent({ payload: { event, onSuccess } }) {
  try {
    const userId = yield select(getUserId);
    let response = {};
    let successMessage = 'Update event successfully!';

    if (event.id) {
      response = yield call(Api.updateEvent, userId, event);
    } else {
      response = yield call(Api.createEvent, userId, event);
      successMessage = 'Create event successfully!';
    }
    yield put(createEventSuccess(response.data));

    message.success(successMessage);
    if (isFunction(onSuccess)) onSuccess(response.data);
  } catch (error) {
    yield put(createEventFailure(error));
    message.error('Could not create Event');
  }
}

function* watchCreateEvent() {
  yield takeEvery(CREATE_EVENT_REQUEST, createEvent);
}

function* fetchEventMany() {
  try {
    const userId = yield select(state => state.accountReducer.account.account.user.id);
    const { data } = yield call(Api.fetchEventManyByUserId, userId);
    yield put(fetchEventManySuccess(data));
  } catch (error) {
    yield put(fetchEventManyFailure(error));
    message.error('Could not fetch events');
  }
}

function* watchFetchEventMany() {
  yield takeLatest(FETCH_EVENT_MANY_REQUEST, fetchEventMany);
}

function* fetchSuggestedMenuMany({ payload: { eventId } }) {
  try {
    const { data } = yield call(Api.fetchMenuManyAndLimit);
    yield put(fetchSuggestedMenuManySuccess(data));
  } catch (error) {
    yield put(fetchSuggestedMenuManyFailure(error));
    const errorMessage = parseErrorMessage(error);
    message.error(errorMessage);
  }
}

function* watchFetchSuggestedMenuMany() {
  yield takeLatest(FETCH_SUGGESTED_MENU_MANY_REQUEST, fetchSuggestedMenuMany);
}

export default function* eventFlow() {
  yield all([
    watchCreateEvent(),
    watchFetchEventMany(),
    watchFetchSuggestedMenuMany(),
  ]);
}
