import {
  all, call, takeLatest, put, fork,
} from 'redux-saga/effects';
import { map } from 'lodash';
import { message } from 'antd';
import { parseErrorMessage } from '../../../utils/Utils';
import Api from '../../../api/Api';
import {
  FETCH_EVENT_TYPE_MANY_REQUEST, fetchEventTypeManySuccess, fetchEventTypeManyFailure,
  fetchDistrictManyFailure, fetchDistrictManySuccess, FETCH_DISTRICT_MANY_REQUEST,
  FETCH_CITY_MANY_REQUEST, fetchCityManySuccess, fetchCityManyFailure, fetchCityAndDistrictSuccess,
  FETCH_MENU_DETAIL_REQUEST, fetchMenuDetailFailure, fetchMenuDetailSuccess,
  fetchMenuManySuccess, fetchMenuManyFailure, FETCH_MENU_MANY_REQUEST,
} from '../actions/general';

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

function* fetchDistrictMany() {
  try {
    const { data } = yield call(Api.fetchDistrictMany);
    yield put(fetchDistrictManySuccess(data));
  } catch (error) {
    const errorMessage = parseErrorMessage(error);
    yield put(fetchDistrictManyFailure(error));
    message.error(errorMessage);
  }
}

function* watchFetchDistrictMany() {
  yield takeLatest(FETCH_DISTRICT_MANY_REQUEST, fetchDistrictMany);
}

function* fetchCityMany() {
  try {
    const { data } = yield call(Api.fetchCityMany);
    yield put(fetchCityManySuccess(data));
  } catch (error) {
    const errorMessage = parseErrorMessage(error);
    yield put(fetchCityManyFailure(error));
    message.error(errorMessage);
  }
}

function* watchFetchCityMany() {
  yield takeLatest(FETCH_CITY_MANY_REQUEST, fetchCityMany);
}

function* fetchCityAndDistrictParallel() {
  try {
    const [city, district] = yield all([
      call(Api.fetchCityMany),
      call(Api.fetchDistrictMany),
    ]);
    const cityAndDistrictList = city.data.map(c => ({
      value: c.id,
      label: c.name,
      children: district.data
        .filter(d => d.cityId === c.id)
        .map(d => ({ value: d.id, label: d.name })),
    }));

    yield put(fetchCityManySuccess(city.data));
    yield put(fetchDistrictManySuccess(district.data));
    yield put(fetchCityAndDistrictSuccess(cityAndDistrictList));
  } catch (error) {
    message.error('City and District could not be fetched.');
  }
}

function* fetchMenuDetail({ payload: { id } }) {
  try {
    const { data } = yield call(Api.fetchMenuDetail, id);
    yield put(fetchMenuDetailSuccess(data));
  } catch (error) {
    yield put(fetchMenuDetailFailure(error));
    const errorMessage = parseErrorMessage(error);
    message.error(errorMessage);
  }
}

function* watchFetchMenuDetail() {
  yield takeLatest(FETCH_MENU_DETAIL_REQUEST, fetchMenuDetail);
}

function* fetchMenuMany({ payload: { text } }) {
  try {
    const { data } = yield call(Api.fetchMenuManyEs, text);

    const menus = map(data.hits.hits, h => h._source); //eslint-disable-line
    yield put(fetchMenuManySuccess(menus));
  } catch (error) {
    yield put(fetchMenuManyFailure(error));
    message.error('Could not fetch menus');
  }
}

function* watchFetchMenuMany() {
  yield takeLatest(FETCH_MENU_MANY_REQUEST, fetchMenuMany);
}

export default function* generalFlow() {
  yield all([
    watchFetchEventTypeMany(),
    watchFetchDistrictMany(),
    watchFetchCityMany(),
    watchFetchMenuDetail(),
    watchFetchMenuMany(),

    // fetch general data at initial load time
    fork(fetchEventTypeMany),
    fork(fetchCityAndDistrictParallel),
  ]);
}
