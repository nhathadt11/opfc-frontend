import {
  all, takeLatest, takeEvery, put, select, call,
} from 'redux-saga/effects';
import { message } from 'antd';
import {
  FETCH_SERVICE_LOCATION_MANY_REQUEST, fetchServiceLocationManyFailure,
  fetchServiceLocationManySuccess, UPDATE_SERVICE_LOCATION_MANY_REQUEST,
  updateServiceLocationManyFailure,
  updateServiceLocationManySuccess,
  UPDATE_BRAND_INFORMATION_REQUEST,
  updateBrandInformationFailure,
  updateBrandInformationSuccess,
} from '../actions/settings';
import Api from '../../../api/Api';

const getBrandId = state => state.accountReducer.account.account.brand.id;

function* fetchServiceLocationMany() {
  try {
    const brandId = yield select(getBrandId);
    const { data } = yield call(Api.fetchServiceLocationMany, brandId);

    yield put(fetchServiceLocationManySuccess(data));
  } catch (error) {
    yield put(fetchServiceLocationManyFailure(error));
    message.error('Service locations could not be fetched.');
  }
}

function* watchFetchServiceLocationMany() {
  yield takeLatest(FETCH_SERVICE_LOCATION_MANY_REQUEST, fetchServiceLocationMany);
}

function* updateServiceLocationMany({ payload: { serviceLocationIds } }) {
  try {
    const brandId = yield select(getBrandId);
    yield call(Api.updateServiceLocationMany, brandId, serviceLocationIds);
    message.success('Service locations have been updated.');
    yield put(updateServiceLocationManySuccess());
  } catch (error) {
    message.error('Service locations could not be updated.');
    yield put(updateServiceLocationManyFailure(error));
  }
}

function* watchUpdateServiceLocationMany() {
  yield takeEvery(UPDATE_SERVICE_LOCATION_MANY_REQUEST, updateServiceLocationMany);
}

function* updateBrandInformation({ payload: { brand } }) {
  try {
    yield call(Api.updateBrandInformation, brand);

    yield put(updateBrandInformationSuccess());
    message.success('Brand information has been updated.');
  } catch (error) {
    yield put(updateBrandInformationFailure(error));
    message.error('Brand information could not be updated.');
  }
}

function* watchUpdateBrandInformation() {
  yield takeEvery(UPDATE_BRAND_INFORMATION_REQUEST, updateBrandInformation);
}

export default function* settingsSagaFlow() {
  yield all([
    watchFetchServiceLocationMany(),
    watchUpdateServiceLocationMany(),
    watchUpdateBrandInformation(),
  ]);
}
