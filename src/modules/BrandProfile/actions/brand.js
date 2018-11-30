export const FETCH_BRAND_DETAIL_REQUEST = 'FETCH_BRAND_DETAIL_REQUEST';
export const FETCH_BRAND_DETAIL_SUCCESS = 'FETCH_BRAND_DETAIL_SUCCESS';
export const FETCH_BRAND_DETAIL_FAILURE = 'FETCH_BRAND_DETAIL_FAILURE';

export const FETCH_BRAND_MENU_MANY_REQUEST = 'FETCH_BRAND_MENU_MANY_REQUEST';
export const FETCH_BRAND_MENU_MANY_SUCCESS = 'FETCH_BRAND_MENU_MANY_SUCCESS';
export const FETCH_BRAND_MENU_MANY_FAILURE = 'FETCH_BRAND_MENU_MANY_FAILURE';

export const FETCH_BRAND_MEAL_MANY_REQUEST = 'FETCH_BRAND_MEAL_MANY_REQUEST';
export const FETCH_BRAND_MEAL_MANY_SUCCESS = 'FETCH_BRAND_MEAL_MANY_SUCCESS';
export const FETCH_BRAND_MEAL_MANY_FAILURE = 'FETCH_BRAND_MEAL_MANY_FAILURE';

export const fetchBrandDetailRequest = id => ({
  type: FETCH_BRAND_DETAIL_REQUEST,
  payload: {
    id,
  },
});

export const fetchBrandDetailSuccess = brandDetail => ({
  type: FETCH_BRAND_DETAIL_SUCCESS,
  payload: {
    brandDetail,
  },
});

export const fetchBrandDetailFailure = error => ({
  type: FETCH_BRAND_DETAIL_FAILURE,
  payload: {
    error,
  },
});

export const fetchBrandMenuManyRequest = (id, page = 1) => ({
  type: FETCH_BRAND_MENU_MANY_REQUEST,
  payload: {
    id,
    page,
  },
});

export const fetchBrandMenuManySuccess = (menuList, total) => ({
  type: FETCH_BRAND_MENU_MANY_SUCCESS,
  payload: {
    menuList,
    total,
  },
});

export const fetchBrandMenuManyFailure = error => ({
  type: FETCH_BRAND_MENU_MANY_FAILURE,
  payload: {
    error,
  },
});

export const fetchBrandMealManyRequest = (id, page = 1) => ({
  type: FETCH_BRAND_MEAL_MANY_REQUEST,
  payload: {
    id,
    page,
  },
});

export const fetchBrandMealManySuccess = (mealList, total) => ({
  type: FETCH_BRAND_MEAL_MANY_SUCCESS,
  payload: {
    mealList,
    total,
  },
});

export const fetchBrandMealManyFailure = error => ({
  type: FETCH_BRAND_MEAL_MANY_FAILURE,
  payload: {
    error,
  },
});
