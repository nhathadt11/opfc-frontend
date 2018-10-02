import { CREATE_BRAND_REQUEST, CREATE_BRAND_SUCCESS, CREATE_BRAND_FAILURE } from '../actions/createBrand';

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
    case CREATE_BRAND_FAILURE: {
      return {
        ...state,
        submitting: false,
      };
    }
    default:
      return state;
  }
};

export default accountReducer;
