export const CREATE_ACCOUNT_REQUEST = 'CREATE_ACCOUNT_REQUEST';
export const CREATE_ACCOUNT_SUCCESS = 'CREATE_ACCOUNT_SUCCESS';
export const CREATE_ACCOUNT_FAILURE = 'CREATE_ACCOUNT_FAILURE';

export const LOGIN_ACCOUNT_REQUEST = 'LOGIN_ACCOUNT_REQUEST';
export const LOGIN_ACCOUNT_SUCCESS = 'LOGIN_ACCOUNT_SUCCESS';
export const LOGIN_ACCOUNT_FAILURE = 'LOGIN_ACCOUNT_FAILURE';

export const createAccountRequest = (account, onSuccess) => ({
  type: CREATE_ACCOUNT_REQUEST,
  payload: {
    account,
    onSuccess,
  },
});

export const createAccountSuccess = account => ({
  type: CREATE_ACCOUNT_SUCCESS,
  payload: {
    account,
  },
});

export const createAccountFailure = error => ({
  type: CREATE_ACCOUNT_FAILURE,
  payload: {
    error,
  },
});

export const loginAccountRequest = (username, password, onSuccess) => ({
  type: LOGIN_ACCOUNT_REQUEST,
  payload: {
    username,
    password,
    onSuccess,
  },
});

export const loginAccountSuccess = account => ({
  type: LOGIN_ACCOUNT_SUCCESS,
  payload: {
    account,
  },
});

export const loginAccountFailure = error => ({
  type: LOGIN_ACCOUNT_FAILURE,
  payload: {
    error,
  },
});
