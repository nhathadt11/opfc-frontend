import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

const createBrand = (account, brand) => axios.post('/api/brand', {
  account,
  brand,
});


export default {
  createBrand,
};
