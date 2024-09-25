import { Component, h, Listen, State } from '@stencil/core';
import store, { steps } from 'store';

import html2Canvas from 'html2canvas-pro';

@Component({
  tag: 'screen-capture',
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

  @State()
  redact: boolean;

  @Listen('screenCapture', { target: 'body' })
  async initialise() {
    this._open = true;

    this.ctx = this.canvas.getContext('2d');

    const canvasSize = this.calculateCanvasSize();
    this.canvas.width = canvasSize.width;
    this.canvas.height = canvasSize.height;

    this.drawCanvas();
  }

  @Listen('resize', { target: 'window' })
  handleWindowResize() {
    if (this._open) {
      const canvasSize = this.calculateCanvasSize();
      this.canvas.width = canvasSize.width;
      this.canvas.height = canvasSize.height;

      this.drawCanvas();
    }
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

  drawSquare(square: { x: number; y: number; width: number; height: number; redact: boolean }) {
    if (square.redact) {
      this.ctx.fillStyle = 'black';
      this.ctx.fillRect(square.x, square.y, square.width, square.height);
    } else {
      this.ctx.clearRect(square.x, square.y, square.width, square.height);
      const cssVariables = getComputedStyle(document.querySelector('customer-feedback'));

      this.ctx.strokeStyle = cssVariables.getPropertyValue('--highlight-border-color');
      this.ctx.lineWidth = parseInt(cssVariables.getPropertyValue('--highlight-border-width'));
      this.ctx.strokeRect(square.x, square.y, square.width, square.height);
    }
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
      redact: this.redact,
    });
  }

  reset() {
    this.drawings = [];
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  async screenshot() {
    if (this.drawings.length === 0) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    const htmlImage = await html2Canvas(document.documentElement, {
      ignoreElements: el => el === this.toolbarRef,
      scale: 0.8,
    });
    store.state.screenshot = htmlImage.toDataURL('png');
    store.state.step = steps.feedbackForm;
    this.close();
  }

  handleMouseDown(e: MouseEvent) {
    this.startX = e.pageX;
    this.startY = e.pageY;

    this.isDown = true;
  }

  async handleMouseUp() {
    this.isDown = false;

    if (this.width === 0 || this.height === 0) {
      return;
    }

    this.drawings.push({
      x: this.startX,
      y: this.startY,
      width: this.width,
      height: this.height,
      redact: this.redact,
    });

    // clear the sizes
    this.width = 0;
    this.height = 0;
  }

  handleMouseOut() {
    this.isDown = false;
  }

  handleMouseMove(e: MouseEvent) {
    if (!this.isDown) {
      return;
    }

    // calculate the rectangle size using start and end mouse positions
    this.width = e.pageX - this.startX;
    this.height = e.pageY - this.startY;

    this.drawNewSquare();
  }

  undo() {
    this.drawings.pop();
    this.drawCanvas();
  }

  render() {
    return (
      <aside class={`screen-capture ${this._open && 'open'}`}>
        <canvas
          ref={el => (this.canvas = el as HTMLCanvasElement)}
          onMouseDown={e => this.handleMouseDown(e)}
          onMouseMove={e => this.handleMouseMove(e)}
          onMouseUp={() => this.handleMouseUp()}
          onMouseOut={() => this.handleMouseOut()}
        />
        {this._open && (
          <div ref={ref => (this.toolbarRef = ref as HTMLDivElement)} class="toolbar">
            <p>Click and drag to draw squares around problem areas</p>
            <button class={`tertiary ${!this.redact && 'active'}`} onClick={() => (this.redact = false)}>
              Highlight
            </button>
            <button class={`tertiary ${this.redact && 'active'}`} onClick={() => (this.redact = true)}>
              Redact
            </button>
            <button onClick={() => this.screenshot()}>Take screenshot</button>
            <button class="tertiary" onClick={() => this.undo()}>
              Undo
            </button>
            <button class="tertiary" onClick={() => this.close()}>
              Cancel
            </button>
          </div>
        )}
      </aside>
    );
  }
}
