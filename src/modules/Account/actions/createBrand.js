export const CREATE_BRAND_REQUEST = 'CREATE_BRAND_REQUEST';
export const CREATE_BRAND_SUCCESS = 'CREATE_BRAND_SUCCESS';
export const CREATE_BRAND_FAILURE = 'CREATE_BRAND_FAILURE';

export const createBrandRequest = (brand, success) => ({
  type: CREATE_BRAND_REQUEST,
  payload: {
    brand,
    success,
  },
});

export const createBrandSuccess = brand => ({
  type: CREATE_BRAND_SUCCESS,
  payload: {
    brand,
  },
});

export const createBrandFailure = error => ({
  type: CREATE_BRAND_FAILURE,
  payload: {
    error,
  },
});
