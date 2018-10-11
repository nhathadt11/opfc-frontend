export const FETCH_EVENT_TYPE_MANY_REQUEST = 'FETCH_EVENT_TYPE_MANY_REQUEST';
export const FETCH_EVENT_TYPE_MANY_SUCCESS = 'FETCH_EVENT_TYPE_MANY_SUCCESS';
export const FETCH_EVENT_TYPE_MANY_FAILURE = 'FETCH_EVENT_TYPE_MANY_FAILURE';

export const fetchEventTypeManyRequest = () => ({
  type: FETCH_EVENT_TYPE_MANY_REQUEST,
});

export const fetchEventTypeManySuccess = eventTypeList => ({
  type: FETCH_EVENT_TYPE_MANY_SUCCESS,
  payload: {
    eventTypeList,
  },
});

export const fetchEventTypeManyFailure = error => ({
  type: FETCH_EVENT_TYPE_MANY_FAILURE,
  payload: {
    error,
  },
});
