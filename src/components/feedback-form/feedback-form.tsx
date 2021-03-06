import { Component, Event, EventEmitter, h, Prop } from '@stencil/core';
import store, { steps } from 'store';

@Component({
  tag: 'feedback-form',
})
export class FeedbackForm {
  @Prop() header: string = 'Send feedback';
  @Prop() intro: string = "Use this form to report any problems you've encountered.";

  @Event() feedback: EventEmitter;

  cancel() {
    store.reset();
  }

  handleDescriptionChange(e) {
    store.state.description = e.target.value;
  }

  goToScreenCapture() {
    store.state.step = steps.screenCapture;
    document.querySelector('screen-capture').initialise();
  }

  removeScreenshot() {
    store.state.screenshot = null;
  }

  sendFeedback() {
    const { description, screenshot } = store.state;
    this.feedback.emit({ description, screenshot });
    store.reset();
  }

  render() {
    return (
      store.state.step === steps.feedbackForm && (
        <div>
          <div aria-hidden class="c-overlay" onClick={() => this.cancel()}></div>
          <div role="dialog" class="o-modal" aria-label={this.header} aria-modal="true" aria-expanded="true">
            <aside class="c-modal">
              <header class="c-modal__header">
                <h2>{this.header}</h2>
              </header>

              <div class="c-modal__body">
                <p class="c-paragraph">{this.intro}</p>
                <form class="o-form">
                  <div class="o-form__section">
                    <label class="c-form__label" htmlFor="feedback-form-description">
                      Description
                    </label>
                    <textarea
                      rows={10}
                      class="c-form__textarea"
                      id="feedback-form-description"
                      value={store.state.description}
                      onChange={e => this.handleDescriptionChange(e)}
                      required
                    ></textarea>
                  </div>
                  {store.state.screenshot && (
                    <div class="o-form__section">
                      <label class="c-form__label">Screenshot</label>
                      <div class="o-screenshot">
                        <img class="c-screenshot" src={store.state.screenshot} />
                      </div>
                    </div>
                  )}
                </form>
              </div>

              <footer class="c-modal__footer">
                <button type="button" class="c-button c-button--primary" onClick={() => this.sendFeedback()}>
                  Send feedback
                </button>
                <button
                  type="button"
                  class="c-button c-button--secondary"
                  onClick={() => (store.state.screenshot ? this.removeScreenshot() : this.goToScreenCapture())}
                >
                  {store.state.screenshot ? 'Remove screenshot' : 'Take screenshot'}
                </button>
                <button type="button" class="c-button c-button--tertiary" onClick={() => this.cancel()}>
                  Cancel
                </button>
              </footer>
            </aside>
          </div>
        </div>
      )
    );
  }
}
