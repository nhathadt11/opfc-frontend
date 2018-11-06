export const BOOKMARK_REQUEST = 'BOOKMARK_REQUEST';
export const BOOKMARK_SUCCESS = 'BOOKMARK_SUCCESS';
export const BOOKMARK_FAILURE = 'BOOKMARK_FAILURE';

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
