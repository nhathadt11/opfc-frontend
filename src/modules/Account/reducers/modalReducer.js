import {
  SHOW_LOGIN_MODAL, HIDE_LOGIN_MODAL,
  SHOW_BRAND_CREATE_MODAL, HIDE_BRAND_CREATE_MODAL,
  SHOW_EVENT_PLANNER_CREATE_MODAL, HIDE_EVENT_PLANNER_CREATE_MODAL,
  SHOW_ROLE_CHOICE_MODAL, HIDE_ROLE_CHOICE_MODAL,
} from '../actions/modal';

const initialState = {
  loginModalVisible: false,
  brandModalVisible: false,
  eventPlannerModalVisible: false,
  roleChoiceVisible: false,
};

const modalReducer = (state = initialState, { type }) => {
  switch (type) {
    case SHOW_LOGIN_MODAL: {
      return {
        ...initialState,
        loginModalVisible: true,
      };
    }
    case SHOW_BRAND_CREATE_MODAL: {
      return {
        ...initialState,
        brandModalVisible: true,
      };
    }
    case SHOW_EVENT_PLANNER_CREATE_MODAL: {
      return {
        ...initialState,
        eventPlannerModalVisible: true,
      };
    }
    case SHOW_ROLE_CHOICE_MODAL: {
      return {
        ...initialState,
        roleChoiceVisible: true,
      };
    }
    case HIDE_LOGIN_MODAL:
    case HIDE_EVENT_PLANNER_CREATE_MODAL:
    case HIDE_BRAND_CREATE_MODAL:
    case HIDE_ROLE_CHOICE_MODAL: {
      return {
        ...initialState,
      };
    }
    default:
      return state;
  }
};

export default modalReducer;
