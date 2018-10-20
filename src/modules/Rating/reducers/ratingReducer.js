import { FETCH_MENU_RATING_MANY_REQUEST, FETCH_MENU_RATING_MANY_SUCCESS, FETCH_MENU_RATING_MANY_FAILURE } from '../actions/rating';

const initialState = {
  fetching: false,
  submitting: false,
  ratingList: [],
};

const ratingReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_MENU_RATING_MANY_REQUEST:
      return {
        ...state,
        fetching: true,
      };
    case FETCH_MENU_RATING_MANY_SUCCESS:
      return {
        ...state,
        fetching: false,
        ratingList: payload.ratingList,
      };
    case FETCH_MENU_RATING_MANY_FAILURE:
      return {
        ...state,
        fetching: false,
      };
    default:
      return state;
  }
};

export default ratingReducer;
