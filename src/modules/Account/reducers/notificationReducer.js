import { INCREASE_NOTIFICATION_COUNT, DECREASE_NOTIFICATION_COUNT } from '../actions/notification';

const initialState = {
  count: 0,
  notificationList: [],
};

const notificationReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case INCREASE_NOTIFICATION_COUNT:
      return {
        ...state,
        count: state.count + 1,
        notificationList: [...state.notificationList, payload.notification],
      };
    case DECREASE_NOTIFICATION_COUNT:
      return {
        ...state,
        count: state.count === 0 ? 0 : state.count - 1,
      };
    default:
      return state;
  }
};

export default notificationReducer;
