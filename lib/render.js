const create = require(`virtual-dom/create-element`)
const diff = require(`virtual-dom/diff`)
const patch = require(`virtual-dom/patch`)
const RenderCache = require(`./RenderCache`)
const cache = new RenderCache()

module.exports = function render (newInstance, root) {
  let node
  const oldInstance = cache.getInstance(root, newInstance.name)

  if (oldInstance) {
    const {instance, child} = oldInstance
    const patches = diff(instance, newInstance)
    node = patch(child, patches)
  } else {
    const child = root.children[0]
    node = create(newInstance)

    if (child) {
      root.replaceChild(node, child)
    } else {
      root.appendChild(node)
    }

  }

  cache.setInstance(root, newInstance, node)

  return node
}
