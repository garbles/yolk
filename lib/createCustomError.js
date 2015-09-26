const inheritClass = require(`./inheritClass`)

module.exports = function createCustomError(name) {
  eval.call(null, `var CustomError = function ${name} (message) {
    this.name = '${name}';
    this.message = message;
    this.stack = (new Error()).stack;
  }`)

  return inheritClass(CustomError, Error)
}
