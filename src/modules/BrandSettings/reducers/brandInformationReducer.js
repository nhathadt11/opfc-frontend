import {
  UPDATE_BRAND_INFORMATION_REQUEST,
  UPDATE_BRAND_INFORMATION_SUCCESS,
  UPDATE_BRAND_INFORMATION_FAILURE,
} from '../actions/settings';

const initialState = {
  fetching: false,
  submitting: false,
  serviceLocationIds: [],
};

const brandInformationReducer = (state = initialState, { type }) => {
  switch (type) {
    case UPDATE_BRAND_INFORMATION_REQUEST:
      return {
        ...state,
        submitting: true,
      };
    case UPDATE_BRAND_INFORMATION_SUCCESS:
      return {
        ...state,
        submitting: false,
      };
    case UPDATE_BRAND_INFORMATION_FAILURE:
      return {
        ...state,
        submitting: false,
      };
    default:
      return state;
  }
};

export default brandInformationReducer;
