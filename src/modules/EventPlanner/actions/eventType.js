export const CREATE_EVENT_TYPE_REQUEST = 'CREATE_EVENT_TYPE_REQUEST';
export const CREATE_EVENT_TYPE_SUCCESS = 'CREATE_EVENT_TYPE_SUCCESS';
export const CREATE_EVENT_TYPE_FAILURE = 'CREATE_EVENT_TYPE_FAILURE';

export const createEventTypeRequest = event => ({
  type: CREATE_EVENT_TYPE_REQUEST,
  payload: {
    event,
  },
});

export const createEventTypeSuccess = () => ({
  type: CREATE_EVENT_TYPE_SUCCESS,
});

export const createEventTypeFailure = error => ({
  type: CREATE_EVENT_TYPE_FAILURE,
  payload: {
    error,
  },
});
