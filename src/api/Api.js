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

  return axios.post('/Event', event);
};

const fetchEventMany = () => axios.get('/Event');

const createMeal = (meal) => {
  const toBeCreateMeal = {
    meal,
  };

  return axios.post('/Meal/CreatMeal', toBeCreateMeal);
};

const updateMeal = (meal) => {
  const toBeUpdatedMeal = {
    meal,
  };

  return axios.put('/Meal/UpdateMeal', toBeUpdatedMeal);
};

const deleteMeal = id => axios.delete(`/Meal/${id}`);

const fetchMealMany = () => axios.get('/Meal/GetAllMeal');

// const fetchMenuMany = () => axios.get('/Menu/GetAllMenu');
const fetchMenuMany = () => new Promise((resolve) => {
  setTimeout(() => resolve({
    data: {
      menus: [
        {
          id: 1,
          menuName: 'Menu A',
          description: 'Description A',
          servingNumber: 2,
          price: 12.3,
          eventTypes: [1],
          meals: [1],
          tags: [2, 1],
          photos: ['https://66.media.tumblr.com/a2f0c1471f30dd3e89325ee9f6b86bc8/tumblr_pflxnarapM1sxuwguo1_640.jpg', 'https://sunbasket.com/wp-content/themes/builder/library/img/landing/lean-and-clean/choose-meals-3.jpg'],
        },
        {
          id: 2,
          menuName: 'Menu B',
          description: 'Description B',
          servingNumber: 5,
          price: 45.3,
          eventTypes: [2],
          meals: [3],
          tags: [1, 3],
          photos: ['https://66.media.tumblr.com/a2f0c1471f30dd3e89325ee9f6b86bc8/tumblr_pflxnarapM1sxuwguo1_640.jpg', 'https://sunbasket.com/wp-content/themes/builder/library/img/landing/lean-and-clean/choose-meals-3.jpg'],
        },
        {
          id: 3,
          menuName: 'Menu C',
          description: 'Description C',
          servingNumber: 8,
          price: 67,
          eventTypes: [2],
          meals: [1],
          tags: [1, 2],
          photos: ['https://66.media.tumblr.com/a2f0c1471f30dd3e89325ee9f6b86bc8/tumblr_pflxnarapM1sxuwguo1_640.jpg', 'https://sunbasket.com/wp-content/themes/builder/library/img/landing/lean-and-clean/choose-meals-3.jpg'],
        },
      ],
    },
  }));
});

const createMenu = (menu) => {
  const toBeCreatedMenu = {
    menu,
  };

  return axios.post('/Menu/CreateMenu', toBeCreatedMenu);
};

const updateMenu = (menu) => {
  const toBeUpdatedMenu = {
    menu,
  };

  return axios.post('/Menu/UpdateMenu', toBeUpdatedMenu);
};

const deleteMenu = id => axios.delete(`/Menu/${id}`);

const createAccount = account => axios.post('/User', account);

const updateAccount = (id, account) => axios.put(`/User/${id}`, { user: { ...account } });

const loginAccount = (username, password) => axios.post('/User/Authenticate', { username, password });

const fetchEventTypeMany = () => axios.get('/EventType');

export default {
  createBrand,
  uploadImage,
  createEvent,
  fetchEventMany,
  createMeal,
  updateMeal,
  deleteMeal,
  fetchMealMany,
  fetchMenuMany,
  createMenu,
  updateMenu,
  deleteMenu,
  createAccount,
  updateAccount,
  loginAccount,
  fetchEventTypeMany,
};
