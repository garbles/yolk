const Rx = require(`rx`)
const isPlainObject = require(`lodash.isplainobject`)
const isObservable = require(`isObservable`)
const isEmpty = require(`isEmpty`)

module.exports = function wrapObject (obj) {
  if (isObservable(obj)) {
    return obj.flatMapLatest(wrapObject)
  } else if (isPlainObject(obj) && !isEmpty(obj)) {
    const keys = Object.keys(obj)
    let values = []

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i]
      const value = obj[key]
      values[i] = wrapObject(value)
    }

    return Rx.Observable.combineLatest(values, (...args) => {
      let newObj = {}

      for (var i = 0; i < args.length; i++) {
        let key = keys[i]
        let value = args[i]
        newObj[key] = value
      }

      return newObj
    })
  } else if (Array.isArray(obj) && obj.length) {
    obj = obj.map(wrapObject)
    return Rx.Observable.combineLatest(obj)
  } else {
    return Rx.Observable.just(obj)
  }
}
