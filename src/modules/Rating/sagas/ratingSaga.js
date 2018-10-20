import {
  call, put, takeLatest, takeEvery, all, select, fork,
} from 'redux-saga/effects';
import { message } from 'antd';
import { isFunction } from 'lodash';
import {
  CREATE_MENU_RATING_REQUEST, createMenuRatingFailure, createMenuRatingSuccess,
  fetchMenuRatingManyFailure, FETCH_MENU_RATING_MANY_REQUEST, fetchMenuRatingManySuccess,
} from '../actions/rating';
import Api from '../../../api/Api';

const getUserId = state => state.accountReducer.account.account.user.id;

function* fetchMenuRatingMany({ payload: { menuId } }) {
  try {
    const { data } = yield call(Api.fetchMenuRatingMany, menuId);
    yield put(fetchMenuRatingManySuccess(data));
  } catch (error) {
    yield put(fetchMenuRatingManyFailure(error));
    message.error('Rating could not be fetched.');
  }
}

function* watchFetchMenuRatingMany() {
  yield takeLatest(FETCH_MENU_RATING_MANY_REQUEST, fetchMenuRatingMany);
}

function* createMenuRating({ payload: { rating, menuId, onSuccess } }) {
  try {
    const userId = yield select(getUserId);
    const { data } = yield call(Api.createMenuRating, menuId, userId, rating);

    yield put(createMenuRatingSuccess(data));
    yield fork(fetchMenuRatingMany, { payload: { menuId } });

    message.success('Your review has been posted.');
    if (isFunction(onSuccess)) onSuccess(data);
  } catch (error) {
    yield put(createMenuRatingFailure(error));
    message.error('Rating could not be posted.');
  }
}

function* watchCreateMenuRating() {
  yield takeEvery(CREATE_MENU_RATING_REQUEST, createMenuRating);
}

function* ratingFlow() {
  yield all([
    watchFetchMenuRatingMany(),
    watchCreateMenuRating(),
  ]);
}

export default ratingFlow;
