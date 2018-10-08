export const FETCH_MENU_MANY_REQUEST = 'FETCH_MENU_MANY_REQUEST';
export const FETCH_MENU_MANY_SUCCESS = 'FETCH_MENU_MANY_SUCCESS';
export const FETCH_MENU_MANY_FAILURE = 'FETCH_MENU_MANY_FAILURE';

export const CREATE_MENU_REQUEST = 'CREATE_MENU_REQUEST';
export const CREATE_MENU_SUCCESS = 'CREATE_MENU_SUCCESS';
export const CREATE_MENU_FAILURE = 'CREATE_MENU_FAILURE';

export const DELETE_MENU_REQUEST = 'DELETE_MENU_REQUEST';
export const DELETE_MENU_SUCCESS = 'DELETE_MENU_SUCCESS';
export const DELETE_MENU_FAILURE = 'DELETE_MENU_FAILURE';

export const fetchMenuManyRequest = () => ({
  type: FETCH_MENU_MANY_REQUEST,
});

export const fetchMenuManySuccess = menuList => ({
  type: FETCH_MENU_MANY_SUCCESS,
  payload: {
    menuList,
  },
});

export const fetchMenuManyFailure = error => ({
  type: FETCH_MENU_MANY_FAILURE,
  payload: {
    error,
  },
});

export const createMenuRequest = menu => ({
  type: CREATE_MENU_REQUEST,
  payload: {
    menu,
  },
});

export const createMenuSuccess = menu => ({
  type: CREATE_MENU_SUCCESS,
  payload: {
    menu,
  },
});

export const createMenuFailure = error => ({
  type: CREATE_MENU_FAILURE,
  payload: {
    error,
  },
});

export const deleteMenuRequest = id => ({
  type: DELETE_MENU_REQUEST,
  payload: {
    id,
  },
});

export const deleteMenuSuccess = () => ({
  type: DELETE_MENU_SUCCESS,
});

export const deleteMenuFailure = error => ({
  type: DELETE_MENU_FAILURE,
  payload: {
    error,
  },
});
