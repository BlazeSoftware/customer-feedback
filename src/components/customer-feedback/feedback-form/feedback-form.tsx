import { Component, Element, Event, EventEmitter, Fragment, h, Prop, State } from '@stencil/core';
import store, { steps, Tab } from 'store';

@Component({
  tag: 'feedback-form',
})
export class FeedbackForm {
  @Element() feedbackForm: HTMLElement;

  @Prop() header: string = 'Send feedback';
  @Prop() instruction: string = "Use this form to report any problems you've encountered.";
  @Prop() screenshot: boolean = false;

  @State() expanded: 'description' | 'screenshot' = 'description';

  @Event() feedback: EventEmitter;
  @Event() screenCapture: EventEmitter;

  cancel() {
    store.reset();
  }

  handleDescriptionChange(e: Event) {
    store.state.description = (e.target as HTMLTextAreaElement).value;
  }

  goToScreenCapture() {
    store.state.step = steps.screenCapture;
    this.screenCapture.emit();
  }

  removeScreenshot() {
    store.state.screenshot = null;
  }

  sendFeedback() {
    const { description, screenshot } = store.state;
    if (description || screenshot) {
      this.feedback.emit({ description, screenshot });
      store.reset();
    }
  }

  openTab(tab: Tab) {
    store.state.tab = tab;
  }

  render() {
    return (
      store.state.step === steps.feedbackForm && (
        <Fragment>
          <div aria-hidden class="overlay">
            <aside role="dialog" aria-label={this.header} aria-modal="true" aria-expanded="true">
              <header>
                <h2>{this.header}</h2>
              </header>

              <p class="intro">{this.instruction}</p>

              <section>
                <div class="tabs">
                  <button
                    class={store.state.tab === Tab.Description ? 'active-tab' : ''}
                    onClick={() => this.openTab(Tab.Description)}
                  >
                    Description
                  </button>
                  {this.screenshot && (
                    <button
                      class={store.state.tab === Tab.Screenshot ? 'active-tab' : ''}
                      onClick={() => this.openTab(Tab.Screenshot)}
                    >
                      Screenshot
                    </button>
                  )}
                </div>

                {store.state.tab === Tab.Description && (
                  <textarea value={store.state.description} onChange={e => this.handleDescriptionChange(e)} />
                )}
                {store.state.tab === Tab.Screenshot && (
                  <div class="screenshot">
                    {store.state.screenshot ? (
                      <img src={store.state.screenshot} alt="screenshot" />
                    ) : (
                      <div>
                        <p>Add a screenshot to your issue.</p>
                        <button class="secondary" onClick={() => this.goToScreenCapture()}>
                          Add screenshot
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </section>

              <footer>
                <button onClick={() => this.sendFeedback()}>Send feedback</button>
                {store.state.screenshot && (
                  <button class="secondary" onClick={() => this.removeScreenshot()}>
                    Remove screenshot
                  </button>
                )}
                <button class="tertiary" onClick={() => this.cancel()}>
                  Cancel
                </button>
              </footer>
            </aside>
          </div>
        </Fragment>
      )
    );
  }
}
