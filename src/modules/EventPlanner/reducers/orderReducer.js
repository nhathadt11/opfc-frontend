import {
  FETCH_EVENT_PLANNER_ORDER_MANY_REQUEST, FETCH_EVENT_PLANNER_ORDER_MANY_SUCCESS,
  FETCH_EVENT_PLANNER_ORDER_MANY_FAILURE,
  FETCH_EVENT_PLANNER_ORDER_DETAIL_REQUEST,
  FETCH_EVENT_PLANNER_ORDER_DETAIL_SUCCESS,
  FETCH_EVENT_PLANNER_ORDER_DETAIL_FAILURE,
} from '../actions/order';

const initialState = {
  fetching: false,
  fetchingOrderDetail: false,
  orderList: [],
  orderDetail: {},
};

const orderReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_EVENT_PLANNER_ORDER_MANY_REQUEST: {
      return {
        ...state,
        fetching: true,
      };
    }
    case FETCH_EVENT_PLANNER_ORDER_MANY_SUCCESS: {
      return {
        ...state,
        orderList: payload.orderList,
        fetching: false,
      };
    }
    case FETCH_EVENT_PLANNER_ORDER_MANY_FAILURE: {
      return {
        ...state,
        fetching: false,
      };
    }
    case FETCH_EVENT_PLANNER_ORDER_DETAIL_REQUEST: {
      return {
        ...state,
        fetchingOrderDetail: true,
      };
    }
    case FETCH_EVENT_PLANNER_ORDER_DETAIL_SUCCESS: {
      return {
        ...state,
        orderDetail: payload.orderDetail,
        fetchingOrderDetail: false,
      };
    }
    case FETCH_EVENT_PLANNER_ORDER_DETAIL_FAILURE: {
      return {
        ...state,
        fetchingOrderDetail: false,
      };
    }
    default:
      return state;
  }
};

export default orderReducer;
