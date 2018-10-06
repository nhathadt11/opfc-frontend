export const CREATE_MEAL_REQUEST = 'CREATE_MEAL_REQUEST';
export const CREATE_MEAL_SUCCESS = 'CREATE_MEAL_SUCCESS';
export const CREATE_MEAL_FAILURE = 'CREATE_MEAL_FAILURE';

export const createMealRequest = meal => ({
  type: CREATE_MEAL_REQUEST,
  payload: {
    meal,
  },
});

export const createMealSuccess = () => ({
  type: CREATE_MEAL_SUCCESS,
});

export const createMealFailure = error => ({
  type: CREATE_MEAL_FAILURE,
  payload: {
    error,
  },
});
