import {
  FETCH_MENU_MANY_REQUEST, FETCH_MENU_MANY_SUCCESS, FETCH_MENU_MANY_FAILURE,
  CREATE_MENU_REQUEST, CREATE_MENU_SUCCESS, CREATE_MENU_FAILURE,
  DELETE_MENU_REQUEST, DELETE_MENU_SUCCESS, DELETE_MENU_FAILURE,
} from '../actions/menu';

const initialState = {
  menuList: [],
  submitting: false,
  fetching: false,
};

const menuReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_MENU_MANY_REQUEST:
      return {
        ...state,
        fetching: true,
      };
    case FETCH_MENU_MANY_SUCCESS: {
      return {
        ...state,
        fetching: false,
        menuList: payload.menuList,
      };
    }
    case FETCH_MENU_MANY_FAILURE: {
      return {
        ...state,
        fetching: false,
      };
    }
    case CREATE_MENU_REQUEST:
    case DELETE_MENU_REQUEST: {
      return {
        ...state,
        submitting: true,
      };
    }
    case CREATE_MENU_SUCCESS:
    case CREATE_MENU_FAILURE:
    case DELETE_MENU_SUCCESS:
    case DELETE_MENU_FAILURE: {
      return {
        ...state,
        submitting: false,
      };
    }
    default:
      return state;
  }
};

export default menuReducer;
