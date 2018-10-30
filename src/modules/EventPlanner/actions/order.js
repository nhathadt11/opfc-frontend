export const FETCH_EVENT_PLANNER_ORDER_MANY_REQUEST = 'FETCH_EVENT_PLANNER_ORDER_MANY_REQUEST';
export const FETCH_EVENT_PLANNER_ORDER_MANY_SUCCESS = 'FETCH_EVENT_PLANNER_ORDER_MANY_SUCCESS';
export const FETCH_EVENT_PLANNER_ORDER_MANY_FAILURE = 'FETCH_EVENT_PLANNER_ORDER_MANY_FAILURE';

export const FETCH_EVENT_PLANNER_ORDER_DETAIL_REQUEST = 'FETCH_EVENT_PLANNER_ORDER_DETAIL_REQUEST';
export const FETCH_EVENT_PLANNER_ORDER_DETAIL_SUCCESS = 'FETCH_EVENT_PLANNER_ORDER_DETAIL_SUCCESS';
export const FETCH_EVENT_PLANNER_ORDER_DETAIL_FAILURE = 'FETCH_EVENT_PLANNER_ORDER_DETAIL_FAILURE';

export const fetchEventPlannerOrderManyRequest = () => ({
  type: FETCH_EVENT_PLANNER_ORDER_MANY_REQUEST,
});

export const fetchEventPlannerManySuccess = orderList => ({
  type: FETCH_EVENT_PLANNER_ORDER_MANY_SUCCESS,
  payload: {
    orderList,
  },
});

export const fetchEventPlannerManyFailure = error => ({
  type: FETCH_EVENT_PLANNER_ORDER_MANY_FAILURE,
  payload: {
    error,
  },
});

export const fetchEventPlannerOrderDetailRequest = orderId => ({
  type: FETCH_EVENT_PLANNER_ORDER_DETAIL_REQUEST,
  payload: {
    orderId,
  },
});

export const fetchEventPlannerOrderDetailSuccess = orderDetail => ({
  type: FETCH_EVENT_PLANNER_ORDER_DETAIL_SUCCESS,
  payload: {
    orderDetail,
  },
});

export const fetchEventPlannerOrderDetailFailure = error => ({
  type: FETCH_EVENT_PLANNER_ORDER_DETAIL_FAILURE,
  payload: {
    error,
  },
});
