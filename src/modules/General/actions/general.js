export const FETCH_EVENT_TYPE_MANY_REQUEST = 'FETCH_EVENT_TYPE_MANY_REQUEST';
export const FETCH_EVENT_TYPE_MANY_SUCCESS = 'FETCH_EVENT_TYPE_MANY_SUCCESS';
export const FETCH_EVENT_TYPE_MANY_FAILURE = 'FETCH_EVENT_TYPE_MANY_FAILURE';

export const FETCH_DISTRICT_MANY_REQUEST = 'FETCH_DISTRICT_MANY_REQUEST';
export const FETCH_DISTRICT_MANY_SUCCESS = 'FETCH_DISTRICT_MANY_SUCCESS';
export const FETCH_DISTRICT_MANY_FAILURE = 'FETCH_DISTRICT_MANY_FAILURE';

export const FETCH_CITY_MANY_REQUEST = 'FETCH_CITY_MANY_REQUEST';
export const FETCH_CITY_MANY_SUCCESS = 'FETCH_CITY_MANY_SUCCESS';
export const FETCH_CITY_MANY_FAILURE = 'FETCH_CITY_MANY_FAILURE';

export const FETCH_CITY_AND_DISTRICT_REQUEST = 'FETCH_CITY_AND_DISTRICT_REQUEST';
export const FETCH_CITY_AND_DISTRICT_SUCCESS = 'FETCH_CITY_AND_DISTRICT_SUCCESS';
export const FETCH_CITY_AND_DISTRICT_FAILURE = 'FETCH_CITY_AND_DISTRICT_FAILURE';

export const FETCH_MENU_DETAIL_REQUEST = 'FETCH_MENU_DETAIL_REQUEST';
export const FETCH_MENU_DETAIL_SUCCESS = 'FETCH_MENU_DETAIL_SUCCESS';
export const FETCH_MENU_DETAIL_FAILURE = 'FETCH_MENU_DETAIL_FAILURE';

// For guest access
export const FETCH_MENU_MANY_REQUEST = 'FETCH_MENU_MANY_REQUEST';
export const FETCH_MENU_MANY_SUCCESS = 'FETCH_MENU_MANY_SUCCESS';
export const FETCH_MENU_MANY_FAILURE = 'FETCH_MENU_MANY_FAILURE';

export const CHANGE_FULL_TEXT_SEARCH_CRITERIA = 'CHANGE_FULL_TEXT_SEARCH_CRITERIA';
export const ADD_FULL_TEXT_SEARCH_CRITERIA_EVENT_TYPE = 'ADD_FULL_TEXT_SEARCH_CRITERIA_EVENT_TYPE';

export const fetchEventTypeManyRequest = () => ({
  type: FETCH_EVENT_TYPE_MANY_REQUEST,
});

export const fetchEventTypeManySuccess = eventTypeList => ({
  type: FETCH_EVENT_TYPE_MANY_SUCCESS,
  payload: {
    eventTypeList,
  },
});

export const fetchEventTypeManyFailure = error => ({
  type: FETCH_EVENT_TYPE_MANY_FAILURE,
  payload: {
    error,
  },
});

export const fetchDistrictManyRequest = () => ({
  type: FETCH_DISTRICT_MANY_REQUEST,
});

export const fetchDistrictManySuccess = districtList => ({
  type: FETCH_DISTRICT_MANY_SUCCESS,
  payload: {
    districtList,
  },
});

export const fetchDistrictManyFailure = error => ({
  type: FETCH_DISTRICT_MANY_FAILURE,
  payload: {
    error,
  },
});

export const fetchCityManyRequest = () => ({
  type: FETCH_CITY_MANY_REQUEST,
});

export const fetchCityManySuccess = cityList => ({
  type: FETCH_CITY_MANY_SUCCESS,
  payload: {
    cityList,
  },
});

export const fetchCityManyFailure = error => ({
  type: FETCH_CITY_MANY_FAILURE,
  payload: {
    error,
  },
});

export const fetchCityAndDistrictRequest = () => ({
  type: FETCH_CITY_AND_DISTRICT_REQUEST,
});

export const fetchCityAndDistrictSuccess = cityAndDistrictList => ({
  type: FETCH_CITY_AND_DISTRICT_SUCCESS,
  payload: {
    cityAndDistrictList,
  },
});

export const fetchCityAndDistrictFailure = error => ({
  type: FETCH_CITY_AND_DISTRICT_FAILURE,
  payload: {
    error,
  },
});

export const fetchMenuDetailRequest = id => ({
  type: FETCH_MENU_DETAIL_REQUEST,
  payload: {
    id,
  },
});

export const fetchMenuDetailSuccess = menuDetail => ({
  type: FETCH_MENU_DETAIL_SUCCESS,
  payload: {
    menuDetail,
  },
});

export const fetchMenuDetailFailure = error => ({
  type: FETCH_MENU_DETAIL_FAILURE,
  payload: {
    error,
  },
});

export const fetchMenuManyRequest = (text = '') => ({
  type: FETCH_MENU_MANY_REQUEST,
  payload: {
    text,
  },
});

export const fetchMenuManySuccess = menuList => ({
  type: FETCH_MENU_MANY_SUCCESS,
  payload: {
    menuList,
  },
});

export const fetchMenuManyFailure = error => ({
  type: FETCH_MENU_MANY_FAILURE,
  payload: {
    error,
  },
});

export const changeFullTextSearchCriteria = (criteria, value) => ({
  type: CHANGE_FULL_TEXT_SEARCH_CRITERIA,
  payload: {
    criteria,
    value,
  },
});

export const addFullTextSearchCriteriaEventType = eventTypeName => ({
  type: ADD_FULL_TEXT_SEARCH_CRITERIA_EVENT_TYPE,
  payload: {
    eventTypeName,
  },
});
