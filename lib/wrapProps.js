module.exports = function wrapProps (_props) {
  let props = {}

  for(let key in _props) {
    if (_props[key]._isEventHandler) {
      props[key] = (...args) => _props[key](...args)
    } else {
      props[key] = _props[key]
    }
  }

  return props
}
