import { State } from '@stencil/core';
import { createStore } from '@stencil/store';

export const steps = {
  feedbackForm: 'feedback-form',
  screenCapture: 'screen-capture',
};

export enum Tab {
  Description = 'description',
  Screenshot = 'screenshot',
};

type State = {
  step: string;
  screenshot: string;
  description: string;
  tab: Tab;
};

const store = createStore({
  step: null,
  screenshot: '',
  description: '',
  tab: 'description',
} as State);

export default store;
