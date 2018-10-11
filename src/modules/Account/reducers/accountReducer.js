import { CREATE_BRAND_REQUEST, CREATE_BRAND_SUCCESS, CREATE_BRAND_FAILURE } from '../actions/createBrand';
import {
  CREATE_ACCOUNT_REQUEST, CREATE_ACCOUNT_FAILURE,
  CREATE_ACCOUNT_SUCCESS, LOGIN_ACCOUNT_REQUEST,
  LOGIN_ACCOUNT_FAILURE, LOGIN_ACCOUNT_SUCCESS,
} from '../actions/account';

const initialState = {
  account: {},
  submitting: false,
  loggedIn: false,
};

const accountReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case CREATE_BRAND_REQUEST:
    case CREATE_ACCOUNT_REQUEST:
    case LOGIN_ACCOUNT_REQUEST: {
      return {
        ...state,
        submitting: true,
      };
    }
    case CREATE_BRAND_SUCCESS: {
      return {
        ...state,
        brand: payload.brand,
        submitting: false,
      };
    }
    case CREATE_ACCOUNT_SUCCESS: {
      return {
        ...state,
        account: payload.account,
      };
    }
    case LOGIN_ACCOUNT_SUCCESS: {
      return {
        ...state,
        account: payload.account,
        loggedIn: true,
        submitting: false,
      };
    }
    case CREATE_BRAND_FAILURE:
    case CREATE_ACCOUNT_FAILURE:
    case LOGIN_ACCOUNT_FAILURE: {
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
