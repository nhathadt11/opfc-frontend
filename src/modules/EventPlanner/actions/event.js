export const FETCH_EVENT_MANY_REQUEST = 'FETCH_EVENT_MANY_REQUEST';
export const FETCH_EVENT_MANY_SUCCESS = 'FETCH_EVENT_MANY_SUCCESS';
export const FETCH_EVENT_MANY_FAILURE = 'FETCH_EVENT_MANY_FAILURE';

export const CREATE_EVENT_REQUEST = 'CREATE_EVENT_REQUEST';
export const CREATE_EVENT_SUCCESS = 'CREATE_EVENT_SUCCESS';
export const CREATE_EVENT_FAILURE = 'CREATE_EVENT_FAILURE';

export const createEventRequest = (event, onSuccess) => ({
  type: CREATE_EVENT_REQUEST,
  payload: {
    event,
    onSuccess,
  },
});

export const createEventSuccess = () => ({
  type: CREATE_EVENT_SUCCESS,
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
