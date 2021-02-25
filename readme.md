# Customer Feedback

`customer-feedback` is a web component that enables you to capture an annotated screenshot and description of a web page.

It can be themed using CSS variables.
## Getting Started

### Install the package

```bash
npm i @blaze/customer-feedback
```

### Vanilla HTML

Add the following to the `head` of the document.

```html
<script src=""></script>
```

Place this web component at the bottom of the body element:

```html
<customer-feedback></customer-feedback>
```

_Under the hood customer-feedback uses it's position in HTML and a high z-index to ensure it remains on top of the content of your web page, however you may still experience layering issues if you have similar code that overlays all content._

## React

Install the package then add the following code to the start up routine (usually index.js)

```js
import { applyPolyfills, defineCustomElements } from "customer-feedback/loader";

applyPolyfills().then(() => {
  defineCustomElements();
});
```

### Further reading on integrating in other frameworks
https://stenciljs.com/docs/overview

### Run Locally

Running the code locally is simple. Copy and paste the following into a terminal and press enter.

```bash
git clone git@github.com:BlazeSoftware/customer-feedback.git
cd customer-feedback
nvm use
npm i
npm start
```

It's as simple as that.

## Contributing

Get it running locally, make changes and raise a PR 🔥
