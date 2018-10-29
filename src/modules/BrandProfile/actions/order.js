export const FETCH_ORDER_MANY_REQUEST = 'FETCH_ORDER_MANY_REQUEST';
export const FETCH_ORDER_MANY_SUCCESS = 'FETCH_ORDER_MANY_SUCCESS';
export const FETCH_ORDER_MANY_FAILURE = 'FETCH_ORDER_MANY_FAILURE';

export const fetchOrderManyRequest = () => ({
  type: FETCH_ORDER_MANY_REQUEST,
});

export const fetchOrderManySuccess = orderList => ({
  type: FETCH_ORDER_MANY_SUCCESS,
  payload: {
    orderList,
  },
});

export const fetchOrderManyFailure = error => ({
  type: FETCH_ORDER_MANY_FAILURE,
  payload: {
    error,
  },
});
