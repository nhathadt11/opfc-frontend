import {
  BOOKMARK_REQUEST, BOOKMARK_SUCCESS, BOOKMARK_FAILURE,
  FETCH_BOOKMARK_MANY_REQUEST, FETCH_BOOKMARK_MANY_SUCCESS, FETCH_BOOKMARK_MANY_FAILURE,
} from '../actions/bookmark';

const initialState = {
  submitting: false,
  fetching: false,
  bookmarkList: [],
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
    case FETCH_BOOKMARK_MANY_REQUEST: {
      return {
        ...state,
        fetching: true,
      };
    }
    case FETCH_BOOKMARK_MANY_SUCCESS: {
      return {
        ...state,
        fetching: false,
        bookmarkList: payload.bookmarkList,
      };
    }
    case FETCH_BOOKMARK_MANY_FAILURE: {
      return {
        ...state,
        fetching: false,
      };
    }
    default:
      return state;
  }
};

export default bookmarkReducer;
