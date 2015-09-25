module.exports = function logger (message) {
  return function throwOnFalsy (condition, additional) {
    if (!condition) {
      throw new Error(`${message} ${additional}`)
    }
  }
}
