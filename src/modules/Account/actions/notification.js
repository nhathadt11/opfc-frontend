export const INCREASE_NOTIFICATION_COUNT = 'INCREASE_NOTIFICATION_COUNT';
export const DECREASE_NOTIFICATION_COUNT = 'DECREASE_NOTIFICATION_COUNT';

export const MARK_NOTIFICATION_AS_READ_REQUEST = 'MARK_NOTIFICATION_AS_READ_REQUEST';
export const MARK_NOTIFICATION_AS_READ_SUCCESS = 'MARK_NOTIFICATION_AS_READ_SUCCESS';
export const MARK_NOTIFICATION_AS_READ_FAILURE = 'MARK_NOTIFICATION_AS_READ_FAILURE';

export const increaseNotificationCount = notification => ({
  type: INCREASE_NOTIFICATION_COUNT,
  payload: {
    notification,
  },
});

export const decreaseNotificationCount = () => ({
  type: DECREASE_NOTIFICATION_COUNT,
});

export const markNotificationAsReadRequest = (userId, notiId) => ({
  type: MARK_NOTIFICATION_AS_READ_REQUEST,
  payload: {
    userId,
    notiId,
  },
});

export const markNotificationAsReadSuccess = () => ({
  type: MARK_NOTIFICATION_AS_READ_SUCCESS,
});

export const markNotificationAsReadFailure = error => ({
  type: MARK_NOTIFICATION_AS_READ_FAILURE,
  payload: {
    error,
  },
});
