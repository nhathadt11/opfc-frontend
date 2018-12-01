import {
  FETCH_USER_BOOKMARK_MENU_ID_MANY_REQUEST, FETCH_USER_BOOKMARK_MENU_ID_MANY_SUCCESS,
  FETCH_USER_BOOKMARK_MENU_ID_MANY_FAILURE,
} from '../actions/bookmark';

const initialState = {
  bookmarkMenuIdList: [],
  fetching: false,
};


const bookmarkReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_USER_BOOKMARK_MENU_ID_MANY_REQUEST: {
      return {
        ...state,
        fetching: true,
      };
    }
    case FETCH_USER_BOOKMARK_MENU_ID_MANY_SUCCESS: {
      return {
        ...state,
        fetching: false,
        bookmarkMenuIdList: payload.bookmarkMenuIdList,
      };
    }
    case FETCH_USER_BOOKMARK_MENU_ID_MANY_FAILURE: {
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
