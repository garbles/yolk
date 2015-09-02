const Bacon = require(`baconjs`)

module.exports = function eventHandler (mapFn) {

  function handler (value) {
    if (typeof mapFn === `function`) {
      value = mapFn(value)
    } else if (typeof mapFn !== `undefined`) {
      value = mapFn
    }

    handler.push(value)
  }

  let {apply, bind, call} = handler

  handler.__proto__ = Bacon.Bus.prototype
  handler._isHandler = true
  Bacon.Bus.call(handler)

  handler.call = call
  handler.apply = apply
  handler.bind = bind

  return handler

}
