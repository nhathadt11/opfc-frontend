export const CREATE_MENU_RATING_REQUEST = 'CREATE_MENU_RATING_REQUEST';
export const CREATE_MENU_RATING_SUCCESS = 'CREATE_MENU_RATING_SUCCESS';
export const CREATE_MENU_RATING_FAILURE = 'CREATE_MENU_RATING_FAILURE';

export const FETCH_MENU_RATING_MANY_REQUEST = 'FETCH_MENU_RATING_MANY_REQUEST';
export const FETCH_MENU_RATING_MANY_SUCCESS = 'FETCH_MENU_RATING_MANY_SUCCESS';
export const FETCH_MENU_RATING_MANY_FAILURE = 'FETCH_MENU_RATING_MANY_FAILURE';

export const createMenuRatingRequest = (rating, menuId, onSuccess) => ({
  type: CREATE_MENU_RATING_REQUEST,
  payload: {
    rating,
    menuId,
    onSuccess,
  },
});

export const createMenuRatingSuccess = rating => ({
  type: CREATE_MENU_RATING_SUCCESS,
  payload: {
    rating,
  },
});

export const createMenuRatingFailure = error => ({
  type: CREATE_MENU_RATING_FAILURE,
  payload: {
    error,
  },
});

export const fetchMenuRatingManyRequest = menuId => ({
  type: FETCH_MENU_RATING_MANY_REQUEST,
  payload: {
    menuId,
  },
});

export const fetchMenuRatingManySuccess = ratingList => ({
  type: FETCH_MENU_RATING_MANY_SUCCESS,
  payload: {
    ratingList,
  },
});

export const fetchMenuRatingManyFailure = error => ({
  type: FETCH_MENU_RATING_MANY_FAILURE,
  payload: {
    error,
  },
});
