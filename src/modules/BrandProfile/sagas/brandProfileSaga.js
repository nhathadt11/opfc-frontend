import {
  all, takeEvery, call, put, takeLatest, select, fork,
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
  createMenuFailure, CREATE_MENU_REQUEST, createMenuSuccess,
  deleteMenuSuccess, deleteMenuFailure, DELETE_MENU_REQUEST,
} from '../actions/menu';
import {
  FETCH_BRAND_DETAIL_REQUEST, fetchBrandDetailSuccess, fetchBrandDetailFailure,
  FETCH_BRAND_MENU_MANY_REQUEST, FETCH_BRAND_MEAL_MANY_REQUEST, fetchBrandMealManySuccess,
  fetchBrandMenuManySuccess, fetchBrandMealManyRequest,
} from '../actions/brand';

const getBrandId = state => state.brandProfileReducer.brand.brandDetail.id;

function* createMeal({ payload: { meal, onSuccess } }) {
  try {
    const brandId = yield select(getBrandId);
    let successMessage = 'Create meal successfully!';
    let response = {};
    if (meal.id) {
      response = yield call(Api.updateMeal, meal.id, meal);
      successMessage = 'Update meal successfully!';
    } else {
      response = yield call(Api.createMeal, meal, brandId);
    }

    if (isFunction(onSuccess)) onSuccess(response.data);
    message.success(successMessage);
    yield put(createMealSuccess(response.data));

    yield put(fetchBrandMealManyRequest(brandId));
  } catch (error) {
    message.error(meal.id ? 'Could not update meal' : 'Could not create meal');
    yield put(createMealFailure(error));
  }
}

function* watchCreateMeal() {
  yield takeEvery(CREATE_MEAL_REQUEST, createMeal);
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

function* fetchBrandDetail({ payload: { id } }) {
  try {
    const { data } = yield call(Api.fetchBrandDetail, id);
    yield put(fetchBrandDetailSuccess(data));
  } catch (error) {
    message.error('Brand detail could not be fetched.');
    yield put(fetchBrandDetailFailure(error));
  }
}

function* watchFetchBrandDetail() {
  yield takeLatest(FETCH_BRAND_DETAIL_REQUEST, fetchBrandDetail);
}

function* fetchBrandMenu({ payload: { id } }) {
  try {
    const { data } = yield call(Api.fetchBrandMenuMany, id);
    yield put(fetchBrandMenuManySuccess(data));
  } catch (error) {
    message.error('Menus could not be fetched.');
  }
}

function* watchFetchBrandMenuMany() {
  yield takeLatest(FETCH_BRAND_MENU_MANY_REQUEST, fetchBrandMenu);
}

function* fetchBrandMealMany({ payload: { id } }) {
  try {
    const { data } = yield call(Api.fetchBrandMealMany, id);
    yield put(fetchBrandMealManySuccess(data));
  } catch (error) {
    message.error('Meals could not be fetched.');
  }
}

function* watchFetchBrandMealMany() {
  yield takeLatest(FETCH_BRAND_MEAL_MANY_REQUEST, fetchBrandMealMany);
}

function* createMenu({ payload: { menu, onSuccess } }) {
  try {
    const brandId = yield select(getBrandId);
    let successMessage = 'Create menu successfully!';
    let response = {};
    if (menu.id) {
      response = yield call(Api.updateMenu, brandId, menu.id, menu);
      successMessage = 'Update menu successfully!';
    } else {
      response = yield call(Api.createMenu, brandId, menu);
    }

    if (isFunction(onSuccess)) onSuccess(response.data);
    message.success(successMessage);
    yield put(createMenuSuccess(response.data));
    yield fork(fetchBrandMenu, { payload: { id: brandId } });
  } catch (error) {
    message.error(menu.id ? 'Could not update menu' : 'Could not create menu');
    yield put(createMenuFailure(error));
  }
}

function* watchCreateMenu() {
  yield takeEvery(CREATE_MENU_REQUEST, createMenu);
}

function* deleteMeal({ payload: { id } }) {
  try {
    yield call(Api.deleteMeal, id);
    message.success('Delete meal successfully!');
    yield put(deleteMealSuccess());
    yield fork(fetchBrandMealMany);
  } catch (error) {
    message.error('Could not delete meal');
    yield put(deleteMealFailure(error));
  }
}

function* watchDeleteMeal() {
  yield takeEvery(DELETE_MEAL_REQUEST, deleteMeal);
}

export default function* brandProfielFlow() {
  yield all([
    watchCreateMeal(),
    watchDeleteMeal(),
    watchFetchMealMany(),
    watchCreateMenu(),
    watchDeleteMenu(),
    watchFetchBrandDetail(),
    watchFetchBrandMenuMany(),
    watchFetchBrandMealMany(),
  ]);
}
