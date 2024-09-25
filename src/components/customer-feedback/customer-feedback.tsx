import { Component, Element, h, Method, Prop } from '@stencil/core';
import store, { steps } from 'store';

@Component({
  tag: 'customer-feedback',
  styleUrl: 'customer-feedback.css',
  shadow: true,
})
export class CustomerFeedback {
  @Element() customerFeedback: HTMLElement;
  @Prop() header: string;
  @Prop() instruction: string;
  @Prop() screenshot: boolean;

  @Method()
  async show() {
    store.state.step = steps.feedbackForm;
  }

  @Method()
  async close() {
    store.reset();
  }

  render() {
    return [
      <feedback-form header={this.header} instruction={this.instruction} screenshot={this.screenshot} />,
      <screen-capture />,
    ];
  }
}
