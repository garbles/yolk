module.exports = function hasOwnProperty (object, key) {
  return Object.prototype.hasOwnProperty.call(object, key)
}
