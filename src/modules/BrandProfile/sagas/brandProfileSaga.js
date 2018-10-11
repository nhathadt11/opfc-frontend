import {
  all, takeEvery, call, put, takeLatest,
} from 'redux-saga/effects';
import { message } from 'antd';
import { isFunction } from 'lodash';
import Api from '../../../api/Api';
import {
  CREATE_MEAL_REQUEST, DELETE_MEAL_REQUEST,
  createMealSuccess, createMealFailure, deleteMealSuccess, deleteMealFailure,
  FETCH_MEAL_MANY_REQUEST, fetchMealManyFailure, fetchMealManySuccess,
} from '../actions/meal';
import {
  FETCH_MENU_MANY_REQUEST, fetchMenuManySuccess,
  fetchMenuManyFailure, createMenuFailure,
  CREATE_MENU_REQUEST, createMenuSuccess, deleteMenuSuccess, deleteMenuFailure, DELETE_MENU_REQUEST,
} from '../actions/menu';

function* createMeal({ payload: { meal, onSuccess } }) {
  try {
    let successMessage = 'Create meal successfully!';
    let response = {};
    if (meal.id) {
      response = yield call(Api.updateMeal, meal.id, meal);
      successMessage = 'Update meal successfully!';
    } else {
      response = yield call(Api.createMeal, meal);
    }

    if (isFunction(onSuccess)) onSuccess(response.data);
    message.success(successMessage);
    yield put(createMealSuccess(response.data));
  } catch (error) {
    message.error(meal.id ? 'Could not update meal' : 'Could not create meal');
    yield put(createMealFailure(error));
  }
}

function* watchCreateMeal() {
  yield takeEvery(CREATE_MEAL_REQUEST, createMeal);
}

function* deleteMeal({ payload: { id } }) {
  try {
    yield call(Api.deleteMeal, id);
    message.success('Delete meal successfully!');
    yield put(deleteMealSuccess());
  } catch (error) {
    message.error('Could not delete meal');
    yield put(deleteMealFailure(error));
  }
}

function* watchDeleteMeal() {
  yield takeEvery(DELETE_MEAL_REQUEST, deleteMeal);
}

function* fetchMealMany() {
  try {
    const { data } = yield call(Api.fetchMealMany);
    yield put(fetchMealManySuccess(data));
  } catch (error) {
    yield put(fetchMealManyFailure(error));
    message.error('Could not fetch meals');
  }
}

function* watchFetchMealMany() {
  yield takeLatest(FETCH_MEAL_MANY_REQUEST, fetchMealMany);
}

function* fetchMenuMany() {
  try {
    const { data } = yield call(Api.fetchMenuMany);
    yield put(fetchMenuManySuccess(data.menus));
  } catch (error) {
    yield put(fetchMenuManyFailure(error));
    message.error('Could not fetch menus');
  }
}

function* watchFetchMenuMany() {
  yield takeLatest(FETCH_MENU_MANY_REQUEST, fetchMenuMany);
}

function* createMenu({ payload: { menu, onSuccess } }) {
  try {
    let successMessage = 'Create menu successfully!';
    let response = {};
    if (menu.id) {
      response = yield call(Api.updateMenu, menu.id, menu);
      successMessage = 'Update menu successfully!';
    } else {
      response = yield call(Api.createMenu, menu);
    }

    if (isFunction(onSuccess)) onSuccess(response.data);
    message.success(successMessage);
    yield put(createMenuSuccess(response.data));
  } catch (error) {
    message.error(menu.id ? 'Could not update menu' : 'Could not create menu');
    yield put(createMenuFailure(error));
  }
}

function* watchCreateMenu() {
  yield takeEvery(CREATE_MENU_REQUEST, createMenu);
}

function* deleteMenu({ payload: { id } }) {
  try {
    yield call(Api.deleteMenu, id);
    message.success('Delete menu successfully!');
    yield put(deleteMenuSuccess());
  } catch (error) {
    message.error('Could not delete menu');
    yield put(deleteMenuFailure(error));
  }
}

function* watchDeleteMenu() {
  yield takeEvery(DELETE_MENU_REQUEST, deleteMenu);
}

export default function* brandProfielFlow() {
  yield all([
    watchCreateMeal(),
    watchDeleteMeal(),
    watchFetchMealMany(),
    watchFetchMenuMany(),
    watchCreateMenu(),
    watchDeleteMenu(),
  ]);
}
