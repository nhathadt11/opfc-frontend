import { all, takeEvery, call } from 'redux-saga/effects';
import { message } from 'antd';
import { isFunction } from 'lodash';
import Api from '../../../api/Api';
import { CREATE_MEAL_REQUEST } from '../actions/meal';

function* createMeal({ payload: { meal, onSuccess } }) {
  try {
    const { data } = yield call(Api.createMeal, meal);

    message.success('Create meal successfully');
    if (isFunction(onSuccess)) onSuccess(data);
  } catch (error) {
    message.error('Could not create meal');
  }
}

function* watchCreateMeal() {
  yield takeEvery(CREATE_MEAL_REQUEST, createMeal);
}

export default function* brandProfielFlow() {
  yield all([
    watchCreateMeal(),
  ]);
}
