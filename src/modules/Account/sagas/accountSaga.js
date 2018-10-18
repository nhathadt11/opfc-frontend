import {
  takeEvery, all, put, call, fork, takeLatest,
} from 'redux-saga/effects';
import { isFunction } from 'lodash';
import { message } from 'antd';
import { CREATE_BRAND_REQUEST, createBrandFailure, createBrandSuccess } from '../actions/createBrand';
import Api from '../../../api/Api';
import {
  CREATE_ACCOUNT_REQUEST, createAccountFailure, createAccountSuccess,
  LOGIN_ACCOUNT_REQUEST, loginAccountFailure, loginAccountSuccess, LOGIN_ACCOUNT_SUCCESS,
} from '../actions/account';
import { parseErrorMessage, persistAuthentication, configAxiosAuthHeader, registerUserFirebaseNotification } from '../../../utils/Utils';

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
      response = yield call(Api.updateAccount, account.id, account);
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

function* loginAccount({ payload: { username, password, onSuccess } }) {
  try {
    const { data } = yield call(Api.loginAccount, username, password);

    yield put(loginAccountSuccess(data));

    message.success('Login successfully!');
    yield fork(persistAuthentication, data);
    yield fork(configAxiosAuthHeader, data.token);
    if (isFunction(onSuccess)) onSuccess(data);
  } catch (error) {
    message.error(parseErrorMessage(error));
    yield put(loginAccountFailure(error));
  }
}

function* watchLoginAccount() {
  yield takeEvery(LOGIN_ACCOUNT_REQUEST, loginAccount);
}

function* registerUserToFirebaseNoti({ payload: { account } }) {
  try {
    const { user: { id } } = account;
    yield fork(registerUserFirebaseNotification, id);
  } catch (error) {
    message.error('Cannot register user to recieve notifications');
    throw error;
  }
}

function* watchLoginSuccess() {
  yield takeLatest(LOGIN_ACCOUNT_SUCCESS, registerUserToFirebaseNoti);
}

export default function* accountFlow() {
  yield all([
    watchCreateBrand(),
    watchCreateAccount(),
    watchLoginAccount(),
    watchLoginSuccess(),
  ]);
}
