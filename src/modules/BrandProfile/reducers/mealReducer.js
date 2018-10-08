import {
  CREATE_MEAL_REQUEST, CREATE_MEAL_SUCCESS,
  CREATE_MEAL_FAILURE, FETCH_MEAL_MANY_SUCCESS,
} from '../actions/meal';
import { FETCH_EVENT_MANY_REQUEST, FETCH_EVENT_MANY_FAILURE } from '../../EventPlanner/actions/event';

const initialState = {
  mealList: [],
  fetching: true,
  submitting: false,
};

const mealReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case CREATE_MEAL_REQUEST:
      return {
        ...state,
        submitting: true,
      };
    case CREATE_MEAL_SUCCESS: {
      return {
        ...state,
        submitting: false,
      };
    }
    case CREATE_MEAL_FAILURE: {
      return {
        ...state,
        submitting: false,
      };
    }
    case FETCH_EVENT_MANY_REQUEST: {
      return {
        ...state,
        fetching: true,
      };
    }
    case FETCH_MEAL_MANY_SUCCESS: {
      return {
        ...state,
        mealList: payload.mealList,
      };
    }
    case FETCH_EVENT_MANY_FAILURE: {
      return {
        ...state,
        fetching: false,
      };
    }
    default:
      return state;
  }
};

export default mealReducer;
