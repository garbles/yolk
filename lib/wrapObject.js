const Rx = require(`rx`)

module.exports = function wrapChild (child) {
  // if (child instanceof Rx.Observable) {
  if (!!child.asObservable) {
    return child.flatMapLatest(wrapChild)
  } else {
    return Rx.Observable.return(child)
  }
}
