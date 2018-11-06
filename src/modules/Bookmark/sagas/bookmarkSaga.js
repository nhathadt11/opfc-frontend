import {
  all, put, call, takeLatest, select,
} from 'redux-saga/effects';
import { message } from 'antd';
import { BOOKMARK_REQUEST, bookmarkFailure } from '../actions/bookmark';
import Api from '../../../api/Api';

const getUserId = state => state.accountReducer.account.account.user.id;

function* bookmark({ payload: { menuId, menuName } }) {
  try {
    const userId = yield select(getUserId);
    yield call(Api.bookmark, userId, menuId);
    message.success(`Successfully bookmarked ${menuName}`);
  } catch (error) {
    message.error('Menu could not be bookmarked.');
    yield put(bookmarkFailure(error));
  }
}

function* watchBookmark() {
  yield takeLatest(BOOKMARK_REQUEST, bookmark);
}

export default function* bookmarkFlow() {
  yield all([
    watchBookmark(),
  ]);
}
