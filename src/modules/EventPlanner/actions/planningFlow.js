export const CHANGE_EVENT_PLAN_CURRENT_STEP = 'CHANGE_EVENT_PLAN_CURRENT_STEP';
export const NEXT_EVENT_PLAN_STEP = 'NEXT_EVENT_PLAN_STEP';
export const PREV_EVENT_PLAN_STEP = 'PREV_EVENT_PLAN_STEP';

export const SELECT_MENU = 'SELECT_MENU';

export const SELECT_EVENT = 'SELECT_EVENT';
export const DESELECT_EVENT = 'DESELECT_EVENT';

export const SHOW_RATING_MODAL = 'SHOW_RATING_MODAL';
export const HIDE_RATING_MODAL = 'HIDE_RATING_MODAL';

export const changeEventPlanCurrentStep = step => ({
  type: CHANGE_EVENT_PLAN_CURRENT_STEP,
  payload: {
    step,
  },
});

export const nextEventPlanStep = () => ({
  type: NEXT_EVENT_PLAN_STEP,
});

export const prevEventPlanStep = () => ({
  type: PREV_EVENT_PLAN_STEP,
});

export const selectMenu = menu => ({
  type: SELECT_MENU,
  payload: {
    menu,
  },
});

export const selectEvent = event => ({
  type: SELECT_EVENT,
  payload: {
    event,
  },
});

export const deselectEvent = () => ({
  type: DESELECT_EVENT,
});

export const showRatingModal = () => ({
  type: SHOW_RATING_MODAL,
});

export const hideRatingModal = () => ({
  type: HIDE_RATING_MODAL,
});
