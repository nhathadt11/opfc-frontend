import {
  all, takeEvery, call, put, takeLatest, select,
} from 'redux-saga/effects';
import { message } from 'antd';
import { isFunction, map } from 'lodash';
import {
  CREATE_EVENT_REQUEST, createEventSuccess, fetchEventManyFailure,
  FETCH_EVENT_MANY_REQUEST, fetchEventManySuccess, createEventFailure,
  FETCH_EVENT_DETAIL_REQUEST, fetchEventDetailFailure, fetchEventDetailSuccess,
} from '../actions/event';
import Api from '../../../api/Api';
import {
  FETCH_SUGGESTED_MENU_MANY_REQUEST, fetchSuggestedMenuManyFailure, fetchSuggestedMenuManySuccess,
  CREATE_ORDER_REQUEST, createOrderFailure,
} from '../actions/planningFlow';
import { parseErrorMessage } from '../../../utils/Utils';
import {
  FETCH_EVENT_PLANNER_ORDER_MANY_REQUEST, fetchEventPlannerManyFailure,
  fetchEventPlannerManySuccess, FETCH_EVENT_PLANNER_ORDER_DETAIL_REQUEST,
  fetchEventPlannerOrderDetailFailure, fetchEventPlannerOrderDetailSuccess,
} from '../actions/order';

const getUserId = state => state.accountReducer.account.account.user.id;
const getEventId = state => state.eventPlannerReducer.event.event.id;
const getSelectedMenuList = state => state.eventPlannerReducer.event.selectedMenuList;

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
    console.error(error);
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

function* fetchEventDetail({ payload: { eventId, success } }) {
  try {
    const { data } = yield call(Api.fetchEventDetail, eventId);
    yield put(fetchEventDetailSuccess(data));
    if (isFunction(success)) success(data);
  } catch (error) {
    message.error('Event could not be fetched.');
    yield put(fetchEventDetailFailure(error));
  }
}

function* watchFetchEventDetail() {
  yield takeLatest(FETCH_EVENT_DETAIL_REQUEST, fetchEventDetail);
}

function* fetchSuggestedMenuMany({ payload: { eventId } }) {
  try {
    const userId = yield select(getUserId);
    const { data } = yield call(Api.fetchSuggestedMenuMany, userId, eventId);
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

function* createOrder() {
  try {
    const userId = yield select(getUserId);
    const eventId = yield select(getEventId);
    const selectedMenuList = yield select(getSelectedMenuList);

    const menuIds = map(selectedMenuList, m => m.id);
    const { data } = yield call(Api.createOrder, userId, eventId, menuIds);

    // yield put(createOrderSuccess(data));
    // yield put(deselectMenuAll());
    // yield put(changeEventPlanCurrentStep(0));

    // message.success('Create Order successfully!');
    window.location.href = data.redirect;
  } catch (error) {
    message.error('Order could be made.');
    yield put(createOrderFailure(error));
  }
}

function* watchCreateOrder() {
  yield takeLatest(CREATE_ORDER_REQUEST, createOrder);
}

function* fetchEventPlannerOrderMany() {
  try {
    const userId = yield select(getUserId);
    const { data } = yield call(Api.fetchEventPlannerOrderMany, userId);

    yield put(fetchEventPlannerManySuccess(data));
  } catch (error) {
    message.error('Could not fetch orders.');
    yield put(fetchEventPlannerManyFailure(error));
  }
}

function* watchFetchEventPlannerOrderMany() {
  yield takeLatest(FETCH_EVENT_PLANNER_ORDER_MANY_REQUEST, fetchEventPlannerOrderMany);
}

function* fetchEventPlannerOrderDetail({ payload: { orderId } }) {
  try {
    const { data } = yield call(Api.fetchEventPlannerDetail, orderId);
    yield put(fetchEventPlannerOrderDetailSuccess(data));
  } catch (error) {
    message.error('Could not fetch order detail.');
    yield put(fetchEventPlannerOrderDetailFailure(error));
  }
}

function* watchFetchEventPlannerOrderDetail() {
  yield takeLatest(FETCH_EVENT_PLANNER_ORDER_DETAIL_REQUEST, fetchEventPlannerOrderDetail);
}

export default function* eventFlow() {
  yield all([
    watchCreateEvent(),
    watchFetchEventMany(),
    watchFetchSuggestedMenuMany(),
    watchCreateOrder(),
    watchFetchEventPlannerOrderMany(),
    watchFetchEventPlannerOrderDetail(),
    watchFetchEventDetail(),
  ]);
}
