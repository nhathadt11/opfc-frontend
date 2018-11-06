export const FETCH_ORDER_MANY_REQUEST = 'FETCH_ORDER_MANY_REQUEST';
export const FETCH_ORDER_MANY_SUCCESS = 'FETCH_ORDER_MANY_SUCCESS';
export const FETCH_ORDER_MANY_FAILURE = 'FETCH_ORDER_MANY_FAILURE';

export const CANCEL_BRAND_ORDER_REQUEST = 'CANCEL_BRAND_ORDER_REQUEST';
export const CANCEL_BRAND_ORDER_SUCCESS = 'CANCEL_BRAND_ORDER_SUCCESS';
export const CANCEL_BRAND_ORDER_FAILURE = 'CANCEL_BRAND_ORDER_FAILURE';

export const APPROVE_BRAND_ORDER_REQUEST = 'APPROVE_BRAND_ORDER_REQUEST';
export const APPROVE_BRAND_ORDER_SUCCESS = 'APPROVE_BRAND_ORDER_SUCCESS';
export const APPROVE_BRAND_ORDER_FAILURE = 'APPROVE_BRAND_ORDER_FAILURE';

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

export const cancelBrandOrderRequest = (orderLineId, success) => ({
  type: CANCEL_BRAND_ORDER_REQUEST,
  payload: {
    orderLineId,
    success,
  },
});

export const cancelBrandOrderSuccess = () => ({
  type: CANCEL_BRAND_ORDER_SUCCESS,
});

export const cancelBrandOrderFailure = error => ({
  type: CANCEL_BRAND_ORDER_FAILURE,
  payload: {
    error,
  },
});

export const approveBrandOrderRequest = (orderLineId, success) => ({
  type: APPROVE_BRAND_ORDER_REQUEST,
  payload: {
    orderLineId,
    success,
  },
});

export const approveBrandOrderSuccess = () => ({
  type: APPROVE_BRAND_ORDER_SUCCESS,
});

export const approveBrandOrderFailure = error => ({
  type: APPROVE_BRAND_ORDER_FAILURE,
  payload: {
    error,
  },
});
