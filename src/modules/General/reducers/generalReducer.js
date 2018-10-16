import {
  FETCH_EVENT_TYPE_MANY_REQUEST, FETCH_EVENT_TYPE_MANY_SUCCESS, FETCH_EVENT_TYPE_MANY_FAILURE,
  FETCH_CITY_MANY_REQUEST, FETCH_DISTRICT_MANY_REQUEST, FETCH_CITY_MANY_FAILURE,
  FETCH_DISTRICT_MANY_FAILURE, FETCH_CITY_AND_DISTRICT_REQUEST, FETCH_CITY_AND_DISTRICT_FAILURE,
  FETCH_CITY_MANY_SUCCESS, FETCH_DISTRICT_MANY_SUCCESS, FETCH_CITY_AND_DISTRICT_SUCCESS,
  FETCH_MENU_DETAIL_REQUEST, FETCH_MENU_DETAIL_FAILURE, FETCH_MENU_DETAIL_SUCCESS,
  FETCH_MENU_MANY_REQUEST, FETCH_MENU_MANY_FAILURE, FETCH_MENU_MANY_SUCCESS,
} from '../actions/general';


const initialState = {
  fetching: false,
  eventTypeList: [],
  cityList: [],
  districtList: [],
  cityAndDistrictList: [],
  menuDetail: {},
};

const generalReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_EVENT_TYPE_MANY_REQUEST:
    case FETCH_CITY_MANY_REQUEST:
    case FETCH_DISTRICT_MANY_REQUEST:
    case FETCH_CITY_AND_DISTRICT_REQUEST:
    case FETCH_MENU_DETAIL_REQUEST:
    case FETCH_MENU_MANY_REQUEST:
      return {
        ...state,
        fetching: true,
      };
    case FETCH_EVENT_TYPE_MANY_SUCCESS:
      return {
        ...state,
        fetching: false,
        eventTypeList: payload.eventTypeList,
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
      };
    case FETCH_EVENT_TYPE_MANY_FAILURE:
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
