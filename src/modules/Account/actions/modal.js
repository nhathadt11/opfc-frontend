export const SHOW_LOGIN_MODAL = 'SHOW_LOGIN_MODAL';
export const HIDE_LOGIN_MODAL = 'HIDE_LOGIN_MODAL';

export const SHOW_BRAND_CREATE_MODAL = 'SHOW_BRAND_CREATE_MODAL';
export const HIDE_BRAND_CREATE_MODAL = 'HIDE_BRAND_CREATE_MODAL';

export const SHOW_EVENT_PLANNER_CREATE_MODAL = 'SHOW_EVENT_PLANNER_CREATE_MODAL';
export const HIDE_EVENT_PLANNER_CREATE_MODAL = 'HIDE_EVENT_PLANNER_CREATE_MODAL';

export const SHOW_ROLE_CHOICE_MODAL = 'SHOW_ROLE_CHOICE_MODAL';
export const HIDE_ROLE_CHOICE_MODAL = 'HIDE_ROLE_CHOICE_MODAL';

export const showLoginModal = () => ({
  type: SHOW_LOGIN_MODAL,
});

export const hideLoginModal = () => ({
  type: HIDE_LOGIN_MODAL,
});

export const showBrandCreateModal = () => ({
  type: SHOW_BRAND_CREATE_MODAL,
});

export const hideBrandCreateModal = () => ({
  type: HIDE_BRAND_CREATE_MODAL,
});

export const showEventPlannerModal = () => ({
  type: SHOW_EVENT_PLANNER_CREATE_MODAL,
});

export const hideEventPlannerModal = () => ({
  type: HIDE_EVENT_PLANNER_CREATE_MODAL,
});

export const showRoleChoiceModal = () => ({
  type: SHOW_ROLE_CHOICE_MODAL,
});

export const hideRoleChoiceModal = () => ({
  type: HIDE_ROLE_CHOICE_MODAL,
});
