export const BOOKMARK_REQUEST = 'BOOKMARK_REQUEST';
export const BOOKMARK_SUCCESS = 'BOOKMARK_SUCCESS';
export const BOOKMARK_FAILURE = 'BOOKMARK_FAILURE';

export const REMOVE_BOOKMARK_REQUEST = 'REMOVE_BOOKMARK_REQUEST';
export const REMOVE_BOOKMARK_SUCCESS = 'REMOVE_BOOKMARK_SUCCESS';
export const REMOVE_BOOKMARK_FAILURE = 'REMOVE_BOOKMARK_FAILURE';

export const FETCH_BOOKMARK_MANY_REQUEST = 'FETCH_BOOKMARK_MANY_REQUEST';
export const FETCH_BOOKMARK_MANY_SUCCESS = 'FETCH_BOOKMARK_MANY_SUCCESS';
export const FETCH_BOOKMARK_MANY_FAILURE = 'FETCH_BOOKMARK_MANY_FAILURE';

export const bookmarkRequest = (menuId, menuName) => ({
  type: BOOKMARK_REQUEST,
  payload: {
    menuId,
    menuName,
  },
});

export const bookmarkSuccess = () => ({
  type: BOOKMARK_SUCCESS,
});

export const bookmarkFailure = error => ({
  type: BOOKMARK_FAILURE,
  payload: {
    error,
  },
});

export const removeBookmarkRequest = (menuId, menuName) => ({
  type: REMOVE_BOOKMARK_REQUEST,
  payload: {
    menuId,
    menuName,
  },
});

export const removeBookmarkSuccess = () => ({
  type: REMOVE_BOOKMARK_SUCCESS,
});

export const removeBookmarkFailure = error => ({
  type: REMOVE_BOOKMARK_FAILURE,
  payload: {
    error,
  },
});

export const fetchBookmarkManyRequest = () => ({
  type: FETCH_BOOKMARK_MANY_REQUEST,
});

export const fetchBookmarkManySuccess = bookmarkList => ({
  type: FETCH_BOOKMARK_MANY_SUCCESS,
  payload: {
    bookmarkList,
  },
});

export const fetchBookmarkManyFailure = error => ({
  type: FETCH_BOOKMARK_MANY_FAILURE,
  payload: {
    error,
  },
});
