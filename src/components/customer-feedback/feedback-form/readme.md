# feedback-form

<!-- Auto Generated Below -->


## Properties

| Property      | Attribute     | Description | Type      | Default                                                      |
| ------------- | ------------- | ----------- | --------- | ------------------------------------------------------------ |
| `header`      | `header`      |             | `string`  | `'Send feedback'`                                            |
| `instruction` | `instruction` |             | `string`  | `"Use this form to report any problems you've encountered."` |
| `screenshot`  | `screenshot`  |             | `boolean` | `false`                                                      |


## Events

| Event           | Description | Type               |
| --------------- | ----------- | ------------------ |
| `feedback`      |             | `CustomEvent<any>` |
| `screenCapture` |             | `CustomEvent<any>` |


## Dependencies

### Used by

 - [customer-feedback](..)

### Graph
```mermaid
graph TD;
  customer-feedback --> feedback-form
  style feedback-form fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------


