export const CREATE_MEAL_REQUEST = 'CREATE_MEAL_REQUEST';
export const CREATE_MEAL_SUCCESS = 'CREATE_MEAL_SUCCESS';
export const CREATE_MEAL_FAILURE = 'CREATE_MEAL_FAILURE';

export const DELETE_MEAL_REQUEST = 'DELETE_MEAL_REQUEST';
export const DELETE_MEAL_SUCCESS = 'DELETE_MEAL_SUCCESS';
export const DELETE_MEAL_FAILURE = 'DELETE_MEAL_FAILURE';

export const SELECT_MEAL = 'SELECT_MEAL';
export const DESELECT_MEAL = 'DESELECT_MEAL';

export const createMealRequest = (meal, onSuccess) => ({
  type: CREATE_MEAL_REQUEST,
  payload: {
    meal,
    onSuccess,
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

export const deleteMealRequest = id => ({
  type: DELETE_MEAL_REQUEST,
  payload: {
    id,
  },
});

export const deleteMealSuccess = () => ({
  type: DELETE_MEAL_SUCCESS,
});

export const deleteMealFailure = error => ({
  type: DELETE_MEAL_FAILURE,
  payload: {
    error,
  },
});

export const selectMeal = meal => ({
  type: SELECT_MEAL,
  payload: {
    meal,
  },
});

export const delectMeal = () => ({
  type: DESELECT_MEAL,
});
