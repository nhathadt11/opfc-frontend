export const CHANGE_EVENT_PLAN_CURRENT_STEP = 'CHANGE_EVENT_PLAN_CURRENT_STEP';
export const NEXT_EVENT_PLAN_STEP = 'NEXT_EVENT_PLAN_STEP';
export const PREV_EVENT_PLAN_STEP = 'PREV_EVENT_PLAN_STEP';

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
