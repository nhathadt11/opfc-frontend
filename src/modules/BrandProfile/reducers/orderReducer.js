import { FETCH_ORDER_MANY_REQUEST, FETCH_ORDER_MANY_SUCCESS, FETCH_ORDER_MANY_FAILURE } from '../actions/order';

const initialState = {
  fetching: false,
  orderList: [],
};

const orderReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_ORDER_MANY_REQUEST:
      return {
        ...state,
        fetching: true,
      };
    case FETCH_ORDER_MANY_SUCCESS:
      return {
        ...state,
        orderList: payload.orderList,
        fetching: false,
      };
    case FETCH_ORDER_MANY_FAILURE:
      return {
        ...state,
        fetching: false,
      };
    default:
      return state;
  }
};

export default orderReducer;
