import {
  FETCH_BRAND_DETAIL_REQUEST, FETCH_BRAND_DETAIL_SUCCESS, FETCH_BRAND_DETAIL_FAILURE,
  FETCH_BRAND_MEAL_MANY_REQUEST, FETCH_BRAND_MENU_MANY_REQUEST, FETCH_BRAND_MEAL_MANY_FAILURE,
  FETCH_BRAND_MENU_MANY_FAILURE, FETCH_BRAND_MEAL_MANY_SUCCESS, FETCH_BRAND_MENU_MANY_SUCCESS,
} from '../actions/brand';

const initialState = {
  brandDetail: {},
  mealList: [],
  menuList: [],
  fetching: false,
};

const brandReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_BRAND_DETAIL_REQUEST:
    case FETCH_BRAND_MEAL_MANY_REQUEST:
    case FETCH_BRAND_MENU_MANY_REQUEST:
      return {
        ...state,
        fetching: false,
      };
    case FETCH_BRAND_DETAIL_SUCCESS:
      return {
        ...state,
        fetching: true,
        brandDetail: payload.brandDetail,
      };
    case FETCH_BRAND_MEAL_MANY_SUCCESS:
      return {
        ...state,
        fetching: false,
        mealList: payload.mealList,
      };
    case FETCH_BRAND_MENU_MANY_SUCCESS:
      return {
        ...state,
        fetching: false,
        menuList: payload.menuList,
      };
    case FETCH_BRAND_DETAIL_FAILURE:
    case FETCH_BRAND_MEAL_MANY_FAILURE:
    case FETCH_BRAND_MENU_MANY_FAILURE:
      return {
        ...state,
        fetching: false,
      };
    default:
      return state;
  }
};

export default brandReducer;
