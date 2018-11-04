import { BOOKMARK_REQUEST, BOOKMARK_SUCCESS, BOOKMARK_FAILURE } from '../actions/bookmark';

const initialState = {
  submitting: false,
};

const bookmarkReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case BOOKMARK_REQUEST: {
      return {
        ...state,
        submitting: true,
      };
    }
    case BOOKMARK_SUCCESS:
    case BOOKMARK_FAILURE: {
      return {
        ...state,
        submitting: false,
      };
    }
    default:
      return state;
  }
};

export default bookmarkReducer;
