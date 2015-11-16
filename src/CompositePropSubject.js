const Rx = require(`rx`)
const wrapObject = require(`./wrapObject`)

function CompositePropSubject (obj) {
  this._keys = Object.keys(obj)
  this._length = this._keys.length
  this._obj = {}

  let i = -1

  while (++i < this._length) {
    const key = this._keys[i]
    const value = obj[key]
    this._obj[key] = new Rx.BehaviorSubject(value)
  }
}

CompositePropSubject.prototype = {
  asSubjectObject () {
    return this._obj
  },

  asDistinctObservableObject () {
    const obsObj = {}

    let i = -1

    while (++i < this._length) {
      const key = this._keys[i]
      const subject = this._obj[key]
      obsObj[key] = subject.flatMapLatest(wrapObject).distinctUntilChanged()
    }

    return obsObj
  },

  asObservableObject () {
    const obsObj = {}

    let i = -1

    while (++i < this._length) {
      const key = this._keys[i]
      const subject = this._obj[key]
      obsObj[key] = subject.flatMapLatest(wrapObject)
    }

    return obsObj
  },

  onNext (obj) {
    let i = -1

    while (++i < this._length) {
      const key = this._keys[i]
      const value = obj[key]
      this._obj[key].onNext(value || null)
    }
  },

  dispose () {
    let i = -1

    while (++i < this._length) {
      const key = this._keys[i]
      this._obj[key].dispose()
    }
  },
}

module.exports = CompositePropSubject
