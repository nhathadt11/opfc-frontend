import { union } from 'lodash';
import {
  FETCH_EVENT_TYPE_MANY_REQUEST, FETCH_EVENT_TYPE_MANY_SUCCESS, FETCH_EVENT_TYPE_MANY_FAILURE,
  FETCH_CITY_MANY_REQUEST, FETCH_DISTRICT_MANY_REQUEST, FETCH_CITY_MANY_FAILURE,
  FETCH_DISTRICT_MANY_FAILURE, FETCH_CITY_AND_DISTRICT_REQUEST, FETCH_CITY_AND_DISTRICT_FAILURE,
  FETCH_CITY_MANY_SUCCESS, FETCH_DISTRICT_MANY_SUCCESS, FETCH_CITY_AND_DISTRICT_SUCCESS,
  FETCH_MENU_DETAIL_REQUEST, FETCH_MENU_DETAIL_FAILURE, FETCH_MENU_DETAIL_SUCCESS,
  FETCH_MENU_MANY_REQUEST, FETCH_MENU_MANY_FAILURE, FETCH_MENU_MANY_SUCCESS,
  CHANGE_FULL_TEXT_SEARCH_CRITERIA,
  ADD_FULL_TEXT_SEARCH_CRITERIA_EVENT_TYPE,
  CHANGE_MENU_MANY_PAGE,
  FETCH_CATEGORY_MANY_REQUEST,
  FETCH_CATEGORY_MANY_FAILURE,
  FETCH_CATEGORY_MANY_SUCCESS,
  ADD_FULL_TEXT_SEARCH_CRITERIA_CATEGORY,
} from '../actions/general';


const initialState = {
  fetching: false,
  fetchingEventTypeList: false,
  fetchingCategoryList: false,
  eventTypeList: [],
  categoryList: [],
  cityList: [],
  districtList: [],
  cityAndDistrictList: [],
  menuDetail: {},
  fullTextSearch: {
    value: '',
    categoryNames: [],
    eventTypeNames: [],
    priceFrom: 1,
    priceTo: 500,
    servingNumberFrom: 1,
    servingNumberTo: 50,
    page: 1,
    total: 0,
  },
};

const generalReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case CHANGE_FULL_TEXT_SEARCH_CRITERIA:
      return {
        ...state,
        fullTextSearch: {
          ...state.fullTextSearch,
          [payload.criteria]: payload.value,
          page: 1,
        },
      };
    case FETCH_EVENT_TYPE_MANY_REQUEST:
      return {
        ...state,
        fetchingEventTypeList: true,
      };
    case FETCH_CATEGORY_MANY_REQUEST:
      return {
        ...state,
        fetchingCategoryList: true,
      };
    case FETCH_CITY_MANY_REQUEST:
    case FETCH_DISTRICT_MANY_REQUEST:
    case FETCH_CITY_AND_DISTRICT_REQUEST:
    case FETCH_MENU_DETAIL_REQUEST:
      return {
        ...state,
        fetching: true,
      };
    case FETCH_MENU_MANY_REQUEST:
      return {
        ...state,
        fullTextSearchValue: payload.text,
        fetching: true,
      };
    case FETCH_EVENT_TYPE_MANY_SUCCESS:
      return {
        ...state,
        fetchingEventTypeList: false,
        eventTypeList: payload.eventTypeList,
      };
    case FETCH_CATEGORY_MANY_SUCCESS:
      return {
        ...state,
        fetchingCategoryList: false,
        categoryList: payload.categoryList,
      };
    case FETCH_CITY_MANY_SUCCESS:
      return {
        ...state,
        fetching: false,
        cityList: payload.cityList,
      };
    case FETCH_DISTRICT_MANY_SUCCESS:
      return {
        ...state,
        fetching: false,
        districtList: payload.districtList,
      };
    case FETCH_CITY_AND_DISTRICT_SUCCESS:
      return {
        ...state,
        fetching: false,
        cityAndDistrictList: payload.cityAndDistrictList,
      };
    case FETCH_MENU_DETAIL_SUCCESS:
      return {
        ...state,
        fetching: false,
        menuDetail: payload.menuDetail,
      };
    case FETCH_MENU_MANY_SUCCESS:
      return {
        ...state,
        fetching: false,
        menuList: payload.menuList,
        fullTextSearch: {
          ...state.fullTextSearch,
          total: payload.total,
        },
      };
    case FETCH_EVENT_TYPE_MANY_FAILURE:
      return {
        ...state,
        fetchingEventTypeList: false,
      };
    case FETCH_CATEGORY_MANY_FAILURE:
      return {
        ...state,
        fetchingCategoryList: false,
      };
    case ADD_FULL_TEXT_SEARCH_CRITERIA_EVENT_TYPE:
      return {
        ...state,
        fullTextSearch: {
          ...state.fullTextSearch,
          eventTypeNames: union(state.fullTextSearch.eventTypeNames, [payload.eventTypeName]),
        },
      };
    case ADD_FULL_TEXT_SEARCH_CRITERIA_CATEGORY:
      return {
        ...state,
        fullTextSearch: {
          ...state.fullTextSearch,
          categoryNames: union(state.fullTextSearch.categoryNames, [payload.categoryName]),
        },
      };
    case CHANGE_MENU_MANY_PAGE:
      return {
        ...state,
        fullTextSearch: {
          ...state.fullTextSearch,
          page: payload.page,
        },
      };
    case FETCH_CITY_MANY_FAILURE:
    case FETCH_DISTRICT_MANY_FAILURE:
    case FETCH_CITY_AND_DISTRICT_FAILURE:
    case FETCH_MENU_DETAIL_FAILURE:
    case FETCH_MENU_MANY_FAILURE:
      return {
        ...state,
        fetching: false,
      };
    default:
      return state;
  }
};

export default generalReducer;
