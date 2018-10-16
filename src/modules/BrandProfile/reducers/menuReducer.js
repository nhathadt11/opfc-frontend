import {
  CREATE_MENU_REQUEST, CREATE_MENU_SUCCESS, CREATE_MENU_FAILURE,
  DELETE_MENU_REQUEST, DELETE_MENU_SUCCESS, DELETE_MENU_FAILURE,
} from '../actions/menu';

const initialState = {
  submitting: false,
  fetching: false,
};

const menuReducer = (state = initialState, { type, payload }) => { // eslint-disable-line
  switch (type) {
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
