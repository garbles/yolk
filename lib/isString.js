module.exports = function isString (str) {
  return typeof str === `string` || str instanceof String
}
