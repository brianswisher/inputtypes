var test = require('blue-tape')

var InputTypes = require('./input-types')

test('Usage', function(t) {
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

  t.doesNotThrow(
    () => App({a: '123'}, 'hello world', [1, '2', ['1', 3, {}]], () => {}),
    'does not throw'
  )

  t.end()
})

test('String is not an object', function(t) {
  function App(f, n) { InputTypes.apply(App, arguments) }

  App.inputTypes = [InputTypes.object]

  t.throws(() => App('hello world'), 'throws w/ string')

  t.end()
})

test('Object is not a string', function(t) {
  function App(f, n) { InputTypes.apply(App, arguments) }

  App.inputTypes = [InputTypes.string]

  t.throws(() => App({}), 'throws w/ object')

  t.end()
})

test('Number is not a function', function(t) {
  function App(f, n) { InputTypes.apply(App, arguments) }

  App.inputTypes = [InputTypes.func]

  t.throws(() => App(1), 'throws w/ number')

  t.end()
})

test('Function is not a number', function(t) {
  function App(f, n) { InputTypes.apply(App, arguments) }

  App.inputTypes = [InputTypes.number]

  t.throws(() => App(() => {}), 'throws w/ function')

  t.end()
})

test('Nested input types', function(t) {
  function App(f, n) { InputTypes.apply(App, arguments) }

  App.inputTypes = [
    [
      [
        [
          [
            InputTypes.number
          ]
        ]
      ]
    ]
  ]

  t.doesNotThrow(
    () => App([[[[1]]]]),
    'does not throw w/ deep nesting'
  )

  t.throws(
    () => App([[[['1']]]]),
    'throws w/ deep nesting'
  )

  t.end()
})

test('Type from function', function(t) {
  function App(f, n) { InputTypes.apply(App, arguments) }

  App.inputTypes = [
    (val) => typeof val === InputTypes.number || typeof val === InputTypes.string
  ]

  t.doesNotThrow(
    () => App('hi'),
    'does not throw w/ string'
  )

  t.doesNotThrow(
    () => App(1),
    'does not throw w/ number'
  )

  t.throws(() => App({}), 'throws w/ object')

  t.end()
})
