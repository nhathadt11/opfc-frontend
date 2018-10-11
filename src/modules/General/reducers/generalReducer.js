import {
  FETCH_EVENT_MANY_REQUEST, FETCH_EVENT_MANY_SUCCESS, FETCH_EVENT_MANY_FAILURE,
} from '../../EventPlanner/actions/event';

const initialState = {
  fetching: false,
  eventTypeList: [],
};

const generalReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_EVENT_MANY_REQUEST:
      return {
        ...state,
        fetching: true,
      };
    case FETCH_EVENT_MANY_SUCCESS:
      return {
        ...state,
        fetching: false,
        eventTypeList: payload.eventTypeList,
      };
    case FETCH_EVENT_MANY_FAILURE:
      return {
        ...state,
        fetching: false,
      };
    default:
      return state;
  }
};

export default generalReducer;
