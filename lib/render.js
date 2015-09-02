const {create} = require(`virtual-dom`)

module.exports = function render (instance, root) {
  const node = create(instance)
  root.appendChild(node)
}
