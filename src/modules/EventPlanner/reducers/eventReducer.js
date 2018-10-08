import {
  CREATE_EVENT_REQUEST, CREATE_EVENT_SUCCESS, CREATE_EVENT_FAILURE,
  FETCH_EVENT_MANY_REQUEST, FETCH_EVENT_MANY_SUCCESS, FETCH_EVENT_MANY_FAILURE,
} from '../actions/event';
import {
  CHANGE_EVENT_PLAN_CURRENT_STEP, NEXT_EVENT_PLAN_STEP,
  PREV_EVENT_PLAN_STEP, SELECT_MENU, SELECT_EVENT, DESELECT_EVENT,
} from '../actions/planningFlow';

const initialState = {
  eventList: [],
  event: {},
  submitting: false,
  fetching: false,
  currentStep: 0,
  selectedMenus: [],
};

const eventPlannerReducer = (state = initialState, { type, payload }) => {
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
    case CHANGE_EVENT_PLAN_CURRENT_STEP: {
      return {
        ...state,
        currentStep: payload.step,
      };
    }
    case NEXT_EVENT_PLAN_STEP: {
      return {
        ...state,
        currentStep: state.currentStep + 1,
      };
    }
    case PREV_EVENT_PLAN_STEP: {
      return {
        ...state,
        currentStep: state.currentStep - 1,
      };
    }
    case SELECT_MENU: {
      return {
        ...state,
        selectedMenus: [...state, payload.menu],
      };
    }
    case FETCH_EVENT_MANY_REQUEST: {
      return {
        ...state,
        fetching: true,
      };
    }
    case FETCH_EVENT_MANY_SUCCESS: {
      return {
        ...state,
        fetching: false,
        eventList: payload.eventList,
      };
    }
    case FETCH_EVENT_MANY_FAILURE: {
      return {
        ...state,
        fetching: false,
      };
    }
    case SELECT_EVENT: {
      return {
        ...state,
        event: payload.event,
      };
    }
    case DESELECT_EVENT: {
      return {
        ...state,
        event: {},
      };
    }
    default:
      return state;
  }
};

export default eventPlannerReducer;
