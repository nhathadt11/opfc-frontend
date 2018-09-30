import {
  takeEvery, all, put, call,
} from 'redux-saga/effects';
import { isFunction } from 'lodash';
import { CREATE_BRAND_REQUEST, createBrandFailure, createBrandSuccess } from '../actions/createBrand';
import Api from '../../../api/Api';

function* createBrand({ payload: { brand, success } }) {
  try {
    const { data } = yield call(Api.createBrand, brand);
    yield put(createBrandSuccess(data));

    if (isFunction(success)) success();
  } catch (error) {
    yield put(createBrandFailure(error));
  }
}

function* watchCreateBrand() {
  yield takeEvery(CREATE_BRAND_REQUEST, createBrand);
}

export default function* accountFlow() {
  yield all([
    watchCreateBrand(),
  ]);
}
