import { Component, h, Method, State } from '@stencil/core';
import store, { steps } from 'store';

import html2Canvas from 'html2canvas';

@Component({
  tag: 'screen-capture',
  styleUrl: 'screen-capture.scss',
})
export class ScreenCapture {
  @State() _open: boolean = false;

  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  drawings = [];

  // position of the rectangle
  startX: number;
  startY: number;

  // width and height of box
  width: number;
  height: number;

  // capture mouse button
  isDown: boolean = false;

  toolbarRef: HTMLDivElement;

  @Method()
  async initialise() {
    this._open = true;

    this.ctx = this.canvas.getContext('2d');

    const canvasSize = this.calculateCanvasSize();
    this.canvas.width = canvasSize.width;
    this.canvas.height = canvasSize.height;

    this.drawCanvas();
  }

  async close() {
    this._open = false;
    store.state.step = steps.feedbackForm;
    this.reset();
  }

  calculateCanvasSize() {
    const width = Math.max(
      document.body.scrollWidth,
      document.documentElement.scrollWidth,
      document.body.offsetWidth,
      document.documentElement.offsetWidth,
      document.body.clientWidth,
      document.documentElement.clientWidth,
    );

    const height = Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.offsetHeight,
      document.body.clientHeight,
      document.documentElement.clientHeight,
    );

    return { width, height };
  }

  drawSquare(square: { x: number; y: number; width: number; height: number }) {
    this.ctx.clearRect(square.x, square.y, square.width, square.height);
    this.ctx.strokeStyle = getComputedStyle(document.querySelector('customer-feedback')).getPropertyValue(
      '--button-background',
    );
    this.ctx.lineWidth = 4;
    this.ctx.strokeRect(square.x, square.y, square.width, square.height);
  }

  drawCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = getComputedStyle(document.querySelector('customer-feedback')).getPropertyValue(
      '--overlay-background',
    );
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.drawings.forEach(drawing => this.drawSquare(drawing));
  }

  drawNewSquare() {
    this.drawCanvas();
    this.drawSquare({
      x: this.startX,
      y: this.startY,
      width: this.width,
      height: this.height,
    });
  }

  reset() {
    this.drawings = [];
    this.drawCanvas();
  }

  async screenshot() {
    const htmlImage = await html2Canvas(document.documentElement, {
      ignoreElements: el => el === this.toolbarRef,
    });
    store.state.screenshot = htmlImage.toDataURL('png');
    store.state.step = steps.feedbackForm;
    this.close();
  }

  handleMouseDown(e) {
    this.startX = e.pageX;
    this.startY = e.pageY;

    this.isDown = true;
  }

  async handleMouseUp() {
    this.isDown = false;
    this.drawings.push({
      x: this.startX,
      y: this.startY,
      width: this.width,
      height: this.height,
    });

    // clear the sizes
    this.width = 0;
    this.height = 0;
  }

  handleMouseOut() {
    this.isDown = false;
  }

  handleMouseMove(e) {
    if (!this.isDown) {
      return;
    }

    // calculate the rectangle size using start and end mouse positions
    this.width = e.pageX - this.startX;
    this.height = e.pageY - this.startY;

    this.drawNewSquare();
  }

  render() {
    return (
      <aside class={`o-screen-capture ${this._open && 'o-screen-capture--open'}`}>
        <canvas
          class="c-canvas"
          ref={el => (this.canvas = el as HTMLCanvasElement)}
          onMouseDown={e => this.handleMouseDown(e)}
          onMouseMove={e => this.handleMouseMove(e)}
          onMouseUp={() => this.handleMouseUp()}
          onMouseOut={() => this.handleMouseOut()}
        />
        {this._open && (
          <div ref={ref => (this.toolbarRef = ref as HTMLDivElement)} class="c-toolbar">
            <div class="c-paragraph">Click and drag to draw squares around problem areas</div>
            <button class="c-button c-button--tertiary" onClick={() => this.close()}>
              Cancel
            </button>
            <button class="c-button c-button--primary" onClick={() => this.screenshot()}>
              Take screenshot
            </button>
            <button class="c-button c-button--tertiary" onClick={() => this.reset()}>
              Reset
            </button>
          </div>
        )}
      </aside>
    );
  }
}
