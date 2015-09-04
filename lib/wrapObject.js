const Rx = require(`rx`)

module.exports = function wrapChild (child) {
  if (child instanceof Rx.Observable) {
    return child.flatMapLatest(wrapChild)
  } else {
    return Rx.Observable.just(child)
  }
}
