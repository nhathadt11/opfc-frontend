export const FETCH_EVENT_MANY_REQUEST = 'FETCH_EVENT_MANY_REQUEST';
export const FETCH_EVENT_MANY_SUCCESS = 'FETCH_EVENT_MANY_SUCCESS';
export const FETCH_EVENT_MANY_FAILURE = 'FETCH_EVENT_MANY_FAILURE';

export const CREATE_EVENT_REQUEST = 'CREATE_EVENT_REQUEST';
export const CREATE_EVENT_SUCCESS = 'CREATE_EVENT_SUCCESS';
export const CREATE_EVENT_FAILURE = 'CREATE_EVENT_FAILURE';

export const FETCH_EVENT_DETAIL_REQUEST = 'FETCH_EVENT_DETAIL_REQUEST';
export const FETCH_EVENT_DETAIL_SUCCESS = 'FETCH_EVENT_DETAIL_SUCCESS';
export const FETCH_EVENT_DETAIL_FAILURE = 'FETCH_EVENT_DETAIL_FAILURE';

export const createEventRequest = (event, onSuccess) => ({
  type: CREATE_EVENT_REQUEST,
  payload: {
    event,
    onSuccess,
  },
});

export const createEventSuccess = event => ({
  type: CREATE_EVENT_SUCCESS,
  payload: {
    event,
  },
});

export const createEventFailure = error => ({
  type: CREATE_EVENT_FAILURE,
  payload: {
    error,
  },
});

export const fetchEventManyRequest = () => ({
  type: FETCH_EVENT_MANY_REQUEST,
});

export const fetchEventManySuccess = eventList => ({
  type: FETCH_EVENT_MANY_SUCCESS,
  payload: {
    eventList,
  },
});

export const fetchEventManyFailure = error => ({
  type: FETCH_EVENT_MANY_FAILURE,
  payload: {
    error,
  },
});

export const fetchEventDetailRequest = eventId => ({
  type: FETCH_EVENT_DETAIL_REQUEST,
  payload: {
    eventId,
  },
});

export const fetchEventDetailSuccess = event => ({
  type: FETCH_EVENT_DETAIL_SUCCESS,
  payload: {
    event,
  },
});

export const fetchEventDetailFailure = error => ({
  type: FETCH_EVENT_DETAIL_FAILURE,
  payload: {
    error,
  },
});
