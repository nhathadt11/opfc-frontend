import { find } from 'lodash';
import { INCREASE_NOTIFICATION_COUNT, DECREASE_NOTIFICATION_COUNT, MARK_NOTIFICATION_AS_READ_SUCCESS } from '../actions/notification';

const initialState = {
  count: 0,
  notificationList: [],
};

const notificationReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case INCREASE_NOTIFICATION_COUNT:
      return {
        ...state,
        count: (payload.notification.val && !payload.notification.val['Read']) ? state.count + 1 : state.count,
        notificationList: [payload.notification, ...state.notificationList],
      };
    case DECREASE_NOTIFICATION_COUNT:
      return {
        ...state,
        count: state.count === 0 ? 0 : state.count - 1,
      };
    case MARK_NOTIFICATION_AS_READ_SUCCESS: {
      const nextNotificationList = [...state.notificationList];
      const readNotification = find(nextNotificationList, n => n.key === payload.key);
      if (readNotification) {
        readNotification.val['Read'] = true;
      }

      return {
        ...state,
        notificationList: nextNotificationList,
      };
    }
    default:
      return state;
  }
};

export default notificationReducer;
