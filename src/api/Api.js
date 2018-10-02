import axios from 'axios';
import { CLOUDINARY_API_KEY, CLOUDINARY_UPLOAD_PRESET } from '../constants/AppConstants';

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

const createBrand = (userAndBrand) => {
  const user = {
    username: userAndBrand.username,
    password: userAndBrand.password,
    avatar: userAndBrand.avatar,
    gender: userAndBrand.gender,
    dateOfBirth: userAndBrand.dateOfBirth,
    phone: userAndBrand.privatePhone,
    email: userAndBrand.privateEmail,
    userRoleId: 2,
  };
  const brand = {
    description: userAndBrand.description,
    participantNumber: userAndBrand.participantNumber,
    city: userAndBrand.city,
    district: userAndBrand.district,
    ward: userAndBrand.ward,
    brandName: userAndBrand.brandName,
    phone: userAndBrand.publicPhone,
    email: userAndBrand.publicEmail,
  };

  return axios.post('/Brand/CreateCaterer', {
    user,
    brand,
  });
};

const uploadImage = (file) => {
  const formData = new FormData();

  formData.append('file', file);
  formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
  formData.append('api_key', CLOUDINARY_API_KEY);
  formData.append('timestamp', Date.now() / 1000);

  return axios.post(`https://api.cloudinary.com/v1_1/${CLOUDINARY_UPLOAD_PRESET}/image/upload`, formData, {
    headers: { 'X-Requested-With': 'XMLHttpRequest' },
  });
};

export default {
  createBrand,
  uploadImage,
};
