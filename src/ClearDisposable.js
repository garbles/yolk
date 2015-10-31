function ClearDisposable (method, id) {
  this._id = id
  this._method = method
  this.isDisposed = false
}

ClearDisposable.prototype = {
  dispose () {
    if (!this.isDisposed) {
      this.isDisposed = true
      this._method.call(null, this._id)
    }
  },
}

module.exports = ClearDisposable
