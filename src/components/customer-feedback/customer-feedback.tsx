import { Component, h, Method } from '@stencil/core';
import store, { steps } from 'store';

@Component({
  tag: 'customer-feedback',
  styleUrl: 'customer-feedback.scss',
})
export class CustomerFeedback {
  @Method()
  async show() {
    store.state.step = steps.feedbackForm;
  }

  @Method()
  async close() {
    store.reset();
  }

  render() {
    return [<feedback-form />, <screen-capture />];
  }
}
