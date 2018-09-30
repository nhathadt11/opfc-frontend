import { CREATE_BRAND_REQUEST, CREATE_BRAND_SUCCESS } from '../actions/createBrand';

const initialState = {
  brand: {},
  submitting: false,
};

const accountReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case CREATE_BRAND_REQUEST:
      return {
        ...state,
        submitting: true,
      };
    case CREATE_BRAND_SUCCESS: {
      return {
        ...state,
        brand: payload.brand,
        submitting: false,
      };
    }
    default:
      return state;
  }
};

export default accountReducer;
