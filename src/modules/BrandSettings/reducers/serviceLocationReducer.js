import {
  FETCH_SERVICE_LOCATION_MANY_REQUEST, FETCH_SERVICE_LOCATION_MANY_SUCCESS,
  FETCH_SERVICE_LOCATION_MANY_FAILURE,
} from '../actions/settings';

const initialState = {
  fetching: false,
  serviceLocationIds: [],
};

const serviceLocationReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_SERVICE_LOCATION_MANY_REQUEST:
      return {
        ...state,
        fetching: true,
      };
    case FETCH_SERVICE_LOCATION_MANY_SUCCESS:
      return {
        ...state,
        serviceLocationIds: payload.serviceLocationIds,
        fetching: false,
      };
    case FETCH_SERVICE_LOCATION_MANY_FAILURE:
      return {
        ...state,
        fetching: false,
      };
    default:
      return state;
  }
};

export default serviceLocationReducer;
