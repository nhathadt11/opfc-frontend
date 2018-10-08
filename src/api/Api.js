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

const createEvent = (_event) => {
  const event = {
    event: {
      eventName: _event.eventName,
      description: _event.description,
      startAt: _event.timeRange[0].toISOString(),
      endAt: _event.timeRange[1].toISOString(),
      budget: _event.budget,
      servingNumber: _event.servingNumber,
      city: _event.cityDistrictWard[0],
      district: _event.cityDistrictWard[1],
      ward: _event.cityDistrictWard[2],
      address: _event.address,
      eventTypes: _event.eventTypes,
    },
  };

  return axios.post('/Event/CreateEvent', event);
};

const fetchEventMany = () => axios.get('/Event/GetAllEvent');

const createMeal = (meal) => {
  return axios.post('/Meal', meal);
};

const updateMeal = (meal) => {
  return axios.put('/Meal', meal);
};

const deleteMeal = id => axios.delete(`/Meal/${id}`);

const fetchMealMany = () => axios.get('/Meal/GetAllMeal');

export default {
  createBrand,
  uploadImage,
  createEvent,
  fetchEventMany,
  createMeal,
  updateMeal,
  deleteMeal,
  fetchMealMany,
};
