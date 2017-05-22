var isNotOfType = 'Is not of type'

function inputTypeArguments (args, types) {
  var i
  var max = args.length

  for(i = 0; i < max; i++) {
    var arg = args[i]
    var type = types[i]
    var isOfType = (typeof type === 'function') ? type(arg) : typeof arg === type


    if (Array.isArray(arg)) { inputTypeArguments(arg, type) }
    else { if (!isOfType) throw arg + ' ' + isNotOfType + ': ' + type }
  }
}

function InputTypes () { inputTypeArguments(arguments, this.inputTypes) }

InputTypes.array = 'array'
InputTypes.func = 'function'
InputTypes.number = 'number'
InputTypes.object = 'object'
InputTypes.string = 'string'

module.exports = InputTypes
