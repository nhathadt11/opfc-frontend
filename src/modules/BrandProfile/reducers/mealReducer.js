import { CREATE_MEAL_REQUEST, CREATE_MEAL_SUCCESS, CREATE_MEAL_FAILURE } from '../actions/meal';

const initialState = {
  submitting: false,
};

const mealReducer = (state = initialState, { type }) => {
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
    default:
      return state;
  }
};

export default mealReducer;
