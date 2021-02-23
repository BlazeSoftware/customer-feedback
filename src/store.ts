import { State } from '@stencil/core';
import { createStore } from '@stencil/store';

export const steps = {
  feedbackForm: 'feedback-form',
  screenCapture: 'screen-capture',
};

type State = {
  step: string;
  screenshot: string;
  description: string;
};

const store = createStore({
  step: null,
  screenshot: '',
  description: '',
} as State);

export default store;
