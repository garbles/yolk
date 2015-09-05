const {create, diff, patch} = require(`virtual-dom`)
const RenderCache = require(`RenderCache`)
const cache = new RenderCache()

module.exports = function render (newInstance, root) {
  let node
  const oldInstance = cache.getInstance(root, newInstance.name)

  if (oldInstance) {
    const {instance, child} = oldInstance
    const patches = diff(instance, newInstance)
    node = patch(child, patches)
  } else {
    node = create(newInstance)
    root.appendChild(node)
  }

  cache.setInstance(root, newInstance, node)

  return node
}
