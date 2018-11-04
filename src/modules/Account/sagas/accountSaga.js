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
  LOGOUT_ACCOUNT_REQUEST, logoutAccountFailure, logoutAccountSuccess,
} from '../actions/account';
import {
  parseErrorMessage, persistAuthentication, configAxiosAuthHeader,
  registerUserFirebaseNotification,
  unpersistAuthentication,
} from '../../../utils/Utils';
import { increaseNotificationCount } from '../actions/notification';
import store from '../../../store';
import { fetchGeneralDataRequest } from '../../General/sagas/generalSaga';

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
    yield fork(registerUserFirebaseNotification(id), {
      onChildAdded: notification => store.dispatch(increaseNotificationCount(notification)),
    });
  } catch (error) {
    message.error('Cannot register user to recieve notifications');
    throw error;
  }
}

function* afterLoginSuccess(action) {
  const { payload: { account } } = action;
  yield fork(persistAuthentication, account);
  yield fork(configAxiosAuthHeader, account.token);
  yield fork(registerUserToFirebaseNoti, action);
}

function* watchLoginSuccess() {
  yield takeLatest(LOGIN_ACCOUNT_SUCCESS, afterLoginSuccess);
}

function* logoutAccount() {
  try {
    unpersistAuthentication();
    yield put(logoutAccountSuccess());

    // fetch general data at initial load time
    yield fork(fetchGeneralDataRequest);
  } catch (error) {
    message.error('Could not logout');
    yield put(logoutAccountFailure(error));
  }
}

function* watchLogoutAccount() {
  yield takeEvery(LOGOUT_ACCOUNT_REQUEST, logoutAccount);
}

export default function* accountFlow() {
  yield all([
    watchCreateBrand(),
    watchCreateAccount(),
    watchLoginAccount(),
    watchLoginSuccess(),
    watchLogoutAccount(),
  ]);
}
