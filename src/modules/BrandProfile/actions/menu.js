export const CREATE_MENU_REQUEST = 'CREATE_MENU_REQUEST';
export const CREATE_MENU_SUCCESS = 'CREATE_MENU_SUCCESS';
export const CREATE_MENU_FAILURE = 'CREATE_MENU_FAILURE';

export const DELETE_MENU_REQUEST = 'DELETE_MENU_REQUEST';
export const DELETE_MENU_SUCCESS = 'DELETE_MENU_SUCCESS';
export const DELETE_MENU_FAILURE = 'DELETE_MENU_FAILURE';

export const createMenuRequest = (menu, success) => ({
  type: CREATE_MENU_REQUEST,
  payload: {
    menu,
    success,
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

export const deleteMenuRequest = (id, success) => ({
  type: DELETE_MENU_REQUEST,
  payload: {
    id,
    success,
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
