# Customer Feedback

## Getting Started

To start it clone this repo then inside the directory:

```bash
nvm use
npm i
npm start
```

As simple as that.

## To use in a React App

Install the package then add the following code to the start up routine (usually index.js)

```
import { applyPolyfills, defineCustomElements } from "customer-feedback/loader";

applyPolyfills().then(() => {
  defineCustomElements();
});
```

then place `<customer-feedback></customer-feedback>` at the bottom of the body element.
