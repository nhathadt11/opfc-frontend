export const CREATE_ACCOUNT_REQUEST = 'CREATE_ACCOUNT_REQUEST';
export const CREATE_ACCOUNT_SUCCESS = 'CREATE_ACCOUNT_SUCCESS';
export const CREATE_ACCOUNT_FAILURE = 'CREATE_ACCOUNT_FAILURE';

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
