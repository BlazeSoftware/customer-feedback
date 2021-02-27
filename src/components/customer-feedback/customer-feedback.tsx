import { Component, h, Method, Prop } from '@stencil/core';
import store, { steps } from 'store';

@Component({
  tag: 'customer-feedback',
  styleUrl: 'customer-feedback.scss',
})
export class CustomerFeedback {
  @Prop() header: string;
  @Prop() intro: string;

  @Method()
  async show() {
    store.state.step = steps.feedbackForm;
  }

  @Method()
  async close() {
    store.reset();
  }

  render() {
    return [<feedback-form header={this.header} intro={this.intro} />, <screen-capture />];
  }
}
