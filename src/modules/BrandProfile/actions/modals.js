export const SHOW_CREATE_MENU_MODAL = 'SHOW_CREATE_MENU_MODAL';
export const HIDE_CREATE_MENU_MODAL = 'HIDE_CREATE_MENU_MODAL';
export const SHOW_CREATE_MEAL_MODAL = 'SHOW_CREATE_MEAL_MODAL';
export const HIDE_CREATE_MEAL_MODAL = 'HIDE_CREATE_MEAL_MODAL';

export const showCreateMenuModal = () => ({
  type: SHOW_CREATE_MENU_MODAL,
});

export const hideCreateMenuModal = () => ({
  type: HIDE_CREATE_MENU_MODAL,
});

export const showCreateMealModal = meal => ({
  type: SHOW_CREATE_MEAL_MODAL,
  payload: {
    meal,
  },
});

export const hideCreateMealModal = () => ({
  type: HIDE_CREATE_MEAL_MODAL,
});
