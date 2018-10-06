import { CREATE_EVENT_REQUEST, CREATE_EVENT_SUCCESS, CREATE_EVENT_FAILURE } from '../actions/event';

const initialState = {
  eventList: [],
  event: {},
  submitting: false,
};

const eventPlannerReducer = (state = initialState, { type }) => {
  switch (type) {
    case CREATE_EVENT_REQUEST:
      return {
        ...state,
        submitting: true,
      };
    case CREATE_EVENT_SUCCESS:
      return {
        ...state,
        submitting: false,
      };
    case CREATE_EVENT_FAILURE:
      return {
        ...state,
        submitting: false,
      };
    default:
      return state;
  }
};

export default eventPlannerReducer;
