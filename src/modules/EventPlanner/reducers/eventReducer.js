import { CREATE_EVENT_REQUEST, CREATE_EVENT_SUCCESS, CREATE_EVENT_FAILURE } from '../actions/event';
import {
  CHANGE_EVENT_PLAN_CURRENT_STEP, NEXT_EVENT_PLAN_STEP,
  PREV_EVENT_PLAN_STEP, SELECT_MENU,
} from '../actions/planningFlow';

const initialState = {
  eventList: [],
  event: {},
  submitting: false,
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
    default:
      return state;
  }
};

export default eventPlannerReducer;
