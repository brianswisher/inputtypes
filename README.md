InputTypes
==========

Argument Validation Inspired by React's PropTypes API
-----------------------------------------------------

### Usage
```javascript
var InputTypes = require('./input-types')

function App(f, n) { InputTypes.apply(App, arguments) }

App.inputTypes = [
  InputTypes.object,
  (val) => typeof val === InputTypes.string || typeof val === InputTypes.number,
  [
    InputTypes.number,
    InputTypes.string,
    [
      InputTypes.string,
      InputTypes.number,
      InputTypes.object
    ]
  ],
  InputTypes.func
]

App({a: '123'}, 'hello world', [1, '2', ['1', 3, {}]], () => {})
```

### Quick Start

#### Setup

`nvm install; npm test`

![quick start](quick-start.gif)
