const Rx = require(`./Rx`)

module.exports = function isObservable (obj) {
  return obj instanceof Rx.Observable
}
