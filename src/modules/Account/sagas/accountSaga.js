import {
  takeEvery, all, put, call,
} from 'redux-saga/effects';
import { isFunction } from 'lodash';
import { message } from 'antd';
import { CREATE_BRAND_REQUEST, createBrandFailure, createBrandSuccess } from '../actions/createBrand';
import Api from '../../../api/Api';
import { CREATE_ACCOUNT_REQUEST, createAccountFailure, createAccountSuccess } from '../actions/account';

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

function* createAccount({ payload: { account, onSuccess } }) {
  try {
    let successMessage = 'Create account successfully!';
    let response = {};
    if (account.id) {
      response = yield call(Api.updateAccount, account);
      successMessage = 'Update account successfully!';
    } else {
      response = yield call(Api.createAccount, account);
    }

    if (isFunction(onSuccess)) onSuccess(response.data);
    message.success(successMessage);
    yield put(createAccountSuccess(response.data));
  } catch (error) {
    message.error(account.id ? 'Could not update account' : 'Could not create account');
    yield put(createAccountFailure(error));
  }
}

function* watchCreateAccount() {
  yield takeEvery(CREATE_ACCOUNT_REQUEST, createAccount);
}

export default function* accountFlow() {
  yield all([
    watchCreateBrand(),
    watchCreateAccount(),
  ]);
}
