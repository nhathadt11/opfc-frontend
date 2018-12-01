import {
  all, put, call, takeLatest, select,
} from 'redux-saga/effects';
import { message } from 'antd';
import {
  BOOKMARK_REQUEST, bookmarkFailure, FETCH_BOOKMARK_MANY_REQUEST,
  fetchBookmarkManyFailure, fetchBookmarkManySuccess, removeBookmarkFailure,
  REMOVE_BOOKMARK_REQUEST, removeBookmarkSuccess, bookmarkSuccess,
} from '../actions/bookmark';
import Api from '../../../api/Api';
import { fetchUserBookmarkMenuIdManyRequest } from '../../Account/actions/bookmark';

const getUserId = state => state.accountReducer.account.account.user.id;

function* bookmark({ payload: { menuId, menuName } }) {
  try {
    const userId = yield select(getUserId);

    yield call(Api.bookmark, userId, menuId);

    message.success(`Successfully bookmarked ${menuName}`);
    yield put(bookmarkSuccess());
    yield put(fetchUserBookmarkMenuIdManyRequest());
  } catch (error) {
    message.error('Menu could not be bookmarked.');
    yield put(bookmarkFailure(error));
  }
}

function* watchBookmark() {
  yield takeLatest(BOOKMARK_REQUEST, bookmark);
}

function* removeBookmark({ payload: { menuId, menuName } }) {
  try {
    const userId = yield select(getUserId);

    yield call(Api.removeBookmark, userId, menuId);

    message.success(`Successfully remove bookmark for ${menuName}`);
    yield put(removeBookmarkSuccess());
    yield put(fetchUserBookmarkMenuIdManyRequest());
  } catch (error) {
    message.error('Bookmark could not be removed.');
    yield put(removeBookmarkFailure(error));
  }
}

function* watchRemoveBookmark() {
  yield takeLatest(REMOVE_BOOKMARK_REQUEST, removeBookmark);
}

function* fetchBookmarkMany() {
  try {
    const userId = yield select(getUserId);
    const { data } = yield call(Api.fetchBookmarkMany, userId);

    yield put(fetchBookmarkManySuccess(data));
  } catch (error) {
    message.error('Bookmarks could not be fetched.');
    yield put(fetchBookmarkManyFailure(error));
  }
}

function* watchFetchBookmarkMany() {
  yield takeLatest(FETCH_BOOKMARK_MANY_REQUEST, fetchBookmarkMany);
}

export default function* bookmarkFlow() {
  yield all([
    watchBookmark(),
    watchRemoveBookmark(),
    watchFetchBookmarkMany(),
  ]);
}
