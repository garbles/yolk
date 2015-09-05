module.exports = function wrapProps (_props) {
  let props = {..._props}

  for(let key in props) {
    if (_props[key]._isEventHandler) {
      props[key] = (...args) => _props[key](...args)
    }
  }

  return props
}
