try {
  module.exports = require(`rx`)
} catch (e) {
  module.exports = window.Rx
}
