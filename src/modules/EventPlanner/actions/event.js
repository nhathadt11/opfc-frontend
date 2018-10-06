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
