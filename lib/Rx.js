const createCustomError = require(`./createCustomError`)
const UnsupportedRxVersionError = createCustomError(`UnsupportedRxVersionError`)
let Rx

function checkCompatibility (obj, props) {
  const length = props.length
  let i = -1

  while (++i < length) {
    const prop = props[i]

    if (!obj[prop]) {
      throw new UnsupportedRxVersionError(`${prop} not supported by the included version of Rx.`)
    }
  }
}

try {
  Rx = require(`rx`)
} catch (e) {
  Rx = global.Rx
}

const RX_PROPERTIES = [`BehaviorSubject`, `internals`, `ReplaySubject`]
const OBSERVABLE_CLASS_PROPERTIES = [`combineLatest`, `just`]
const OBSERVABLE_PROTOTYPE_PROPERTIES = [`asObservable`, `flatMapLatest`, `map`, `scan`]

checkCompatibility(Rx, RX_PROPERTIES)
checkCompatibility(Rx.Observable, OBSERVABLE_CLASS_PROPERTIES)
checkCompatibility(Rx.Observable.prototype, OBSERVABLE_PROTOTYPE_PROPERTIES)

module.exports = Rx
