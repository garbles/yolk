const Rx = require(`rx`)
const isPlainObject = require(`lodash.isplainobject`)
const isObservable = require(`./isObservable`)
const isEmpty = require(`./isEmpty`)

module.exports = function wrapObject (obj) {
  if (isObservable(obj)) {
    return obj.flatMapLatest(wrapObject)
  } else if (isPlainObject(obj) && !isEmpty(obj)) {
    const keys = Object.keys(obj)
    const length = keys.length
    let values = Array(length)
    let index = -1

    while (++index < length) {
      const key = keys[index]
      values[index] = wrapObject(obj[key])
    }

    return Rx.Observable.combineLatest(values, function () {
      let newObj = {}
      index = -1

      while (++index < length) {
        const key = keys[index]
        newObj[key] = arguments[index]
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
