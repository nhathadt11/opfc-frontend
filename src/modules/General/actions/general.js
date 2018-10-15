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
