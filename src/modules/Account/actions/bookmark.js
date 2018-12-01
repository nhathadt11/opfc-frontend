export const FETCH_USER_BOOKMARK_MENU_ID_MANY_REQUEST = 'FETCH_USER_BOOKMARK_MENU_ID_MANY_REQUEST';
export const FETCH_USER_BOOKMARK_MENU_ID_MANY_SUCCESS = 'FETCH_USER_BOOKMARK_MENU_ID_MANY_SUCCESS';
export const FETCH_USER_BOOKMARK_MENU_ID_MANY_FAILURE = 'FETCH_USER_BOOKMARK_MENU_ID_MANY_FAILURE';

export const fetchUserBookmarkMenuIdManyRequest = () => ({
  type: FETCH_USER_BOOKMARK_MENU_ID_MANY_REQUEST,
});

export const fetchUserBookmarkMenuIdManySuccess = bookmarkMenuIdList => ({
  type: FETCH_USER_BOOKMARK_MENU_ID_MANY_SUCCESS,
  payload: {
    bookmarkMenuIdList,
  },
});

export const fetchUserBookmarkMenuIdManyFailure = error => ({
  type: FETCH_USER_BOOKMARK_MENU_ID_MANY_FAILURE,
  payload: {
    error,
  },
});
