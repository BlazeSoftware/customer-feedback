# Customer Feedback

A framework free and themeable web component that captures an annotated screenshot and description of a web page.

## Getting Started

#### Vanilla HTML

Add the following to the `head` of the document.

```html
<script type="module" src="https://cdn.jsdelivr.net/npm/@blaze/customer-feedback/dist/customer-feedback/customer-feedback.esm.js"></script>
```

Place this web component at the bottom of the body element:

```html
<customer-feedback></customer-feedback>
```

_Under the hood customer-feedback uses it's position in HTML and a high z-index to ensure it remains on top of the content of your web page, however you may still experience layering issues if you have similar code that overlays all content._

### React

If you'd like to use this component inside a React app firstly install the package:

```bash
npm i @blaze/customer-feedback
```

then add the following code to the start up routine (usually index.js):

```js
import { defineCustomElements } from '@blaze/customer-feedback/loader';
defineCustomElements();
```

### Further reading on integrating in other frameworks

https://stenciljs.com/docs/overview

## Usage

### Attributes

`header` - the header for the modal

`instruction` - the text that appears above the description box

`screenshot` - a boolean attribute to enable screen capture

```html
<customer-feedback header="..." instruction="..." screenshot></customer-feedback>
```

### Methods

`show()` - opens the modal

`close()` - resets the data and closes the modal

```js
await document.querySelector('customer-feedback').show();
```

### Events

`feedback` - event emitted with the description and screenshot data

```js
document.querySelector('customer-feedback').addEventListener('feedback', function (e) {
  console.log(e.detail);
});
```

## Run Locally

Copy and paste the following into a terminal and press enter.

```bash
git clone git@github.com:BlazeSoftware/customer-feedback.git
cd customer-feedback
npm i
npm start
```

It's as simple as that.

## Contributing

Get it running locally, make changes and raise a PR 🔥
