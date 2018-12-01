import { filter } from 'lodash';
import {
  CREATE_EVENT_REQUEST, CREATE_EVENT_SUCCESS, CREATE_EVENT_FAILURE,
  FETCH_EVENT_MANY_REQUEST, FETCH_EVENT_MANY_SUCCESS, FETCH_EVENT_MANY_FAILURE,
  FETCH_EVENT_DETAIL_REQUEST, FETCH_EVENT_DETAIL_SUCCESS, FETCH_EVENT_DETAIL_FAILURE,
} from '../actions/event';
import {
  CHANGE_EVENT_PLAN_CURRENT_STEP, NEXT_EVENT_PLAN_STEP,
  PREV_EVENT_PLAN_STEP, SELECT_MENU, SELECT_EVENT, DESELECT_EVENT,
  SHOW_RATING_MODAL, HIDE_RATING_MODAL, FETCH_SUGGESTED_MENU_MANY_REQUEST,
  FETCH_SUGGESTED_MENU_MANY_SUCCESS, FETCH_SUGGESTED_MENU_MANY_FAILURE,
  CREATE_ORDER_REQUEST, CREATE_ORDER_FAILURE, CREATE_ORDER_SUCCESS,
  DESELECT_MENU_ALL, DESELECT_MENU, SELECT_MENU_MANY, CHANGE_SUGGESTED_MENU_MANY_PARAMS,
  SAVE_CART_ITEM_NOTE,
  SELECT_COMBO_GUID,
} from '../actions/planningFlow';

const initialParams = {
  page: 1,
  size: 10,
  total: 0,
};

const initialState = {
  eventList: [],
  event: {},
  submitting: false,
  fetching: false,
  fetchingEventDetail: false,
  currentStep: 0,
  selectedMenuList: [],
  selectedGuid: null,
  suggestedMenuList: [],
  cartItemNotes: {},
  params: initialParams,
  ratingModalVisible: false,
  rate: {},
};

const eventPlannerReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case CREATE_EVENT_REQUEST:
    case CREATE_ORDER_REQUEST:
      return {
        ...state,
        submitting: true,
      };
    case CREATE_EVENT_SUCCESS:
      return {
        ...state,
        event: payload.event,
        submitting: false,
      };
    case CREATE_ORDER_SUCCESS:
      return {
        ...state,
        submitting: false,
      };
    case CREATE_EVENT_FAILURE:
    case CREATE_ORDER_FAILURE:
      return {
        ...state,
        submitting: false,
      };
    case CHANGE_EVENT_PLAN_CURRENT_STEP: {
      return {
        ...state,
        currentStep: payload.step,
      };
    }
    case NEXT_EVENT_PLAN_STEP: {
      return {
        ...state,
        currentStep: state.currentStep + 1,
      };
    }
    case PREV_EVENT_PLAN_STEP: {
      return {
        ...state,
        currentStep: state.currentStep - 1,
      };
    }
    case SELECT_MENU: {
      return {
        ...state,
        selectedMenuList: [...state.selectedMenuList, payload.menu],
      };
    }
    case DESELECT_MENU: {
      const { menuId } = payload;

      return {
        ...state,
        selectedMenuList: filter(state.selectedMenuList, m => m.id !== menuId),
      };
    }
    case DESELECT_MENU_ALL: {
      return {
        ...state,
        selectedMenuList: [],
      };
    }
    case SELECT_MENU_MANY: {
      return {
        ...state,
        selectedMenuList: payload.menus,
      };
    }
    case FETCH_EVENT_MANY_REQUEST: {
      return {
        ...state,
        fetching: true,
      };
    }
    case FETCH_EVENT_MANY_SUCCESS: {
      return {
        ...state,
        fetching: false,
        eventList: payload.eventList,
      };
    }
    case FETCH_EVENT_MANY_FAILURE: {
      return {
        ...state,
        fetching: false,
      };
    }
    case SELECT_EVENT: {
      return {
        ...state,
        event: payload.event,
        selectedMenuList: [],
        selectedGuid: null,
        suggestedMenuList: [],
        cartItemNotes: {},
        params: initialParams,
      };
    }
    case DESELECT_EVENT: {
      return {
        ...state,
        event: {},
        currentStep: 0,
      };
    }
    case SHOW_RATING_MODAL: {
      return {
        ...state,
        rate: {
          orderLineId: payload.orderLineId,
          brandName: payload.brandName,
          eventName: payload.eventName,
          eventDate: payload.eventDate,
        },
        ratingModalVisible: true,
      };
    }
    case HIDE_RATING_MODAL: {
      return {
        ...state,
        ratingModalVisible: false,
      };
    }
    case FETCH_SUGGESTED_MENU_MANY_REQUEST: {
      return {
        ...state,
        params: {
          ...state.params,
          page: payload.page,
        },
        fetching: true,
      };
    }
    case FETCH_SUGGESTED_MENU_MANY_SUCCESS: {
      return {
        ...state,
        fetching: false,
        suggestedMenuList: payload.suggestedMenuList,
        params: {
          ...state.params,
          total: payload.total,
        },
      };
    }
    case FETCH_SUGGESTED_MENU_MANY_FAILURE: {
      return {
        ...state,
        fetching: false,
      };
    }
    case FETCH_EVENT_DETAIL_REQUEST: {
      return {
        ...state,
        fetchingEventDetail: true,
      };
    }
    case FETCH_EVENT_DETAIL_SUCCESS: {
      return {
        ...state,
        event: payload.event,
        fetchingEventDetail: false,
      };
    }
    case FETCH_EVENT_DETAIL_FAILURE: {
      return {
        ...state,
        fetchingEventDetail: false,
      };
    }
    case CHANGE_SUGGESTED_MENU_MANY_PARAMS: {
      return {
        ...state,
        suggestedMenuList: [],
        fetching: true,
        params: {
          ...state.params,
          ...payload.params,
        },
      };
    }
    case SAVE_CART_ITEM_NOTE: {
      return {
        ...state,
        cartItemNotes: {
          ...state.cartItemNotes,
          [payload.menuId]: payload.note,
        },
      };
    }
    case SELECT_COMBO_GUID: {
      return {
        ...state,
        selectedGuid: payload.guid,
      };
    }
    default:
      return state;
  }
};

export default eventPlannerReducer;
