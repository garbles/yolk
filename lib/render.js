const create = require(`virtual-dom/create-element`)
const diff = require(`virtual-dom/diff`)
const patch = require(`virtual-dom/patch`)

const CACHE_KEY = `__YOLK_NODE_INSTANCE_CACHE_KEY`

function getFromCache (root, name) {
  const cache = root[CACHE_KEY]
  return (cache ? cache[name] : null)
}

function setInCache (root, {instance, node}) {
  let cache = root[CACHE_KEY]

  if (!cache) {
    cache = root[CACHE_KEY] = {}
  }

  cache[instance.name] = {instance, node}
  return instance
}

function replaceChild (root, node) {
  const child = root.children[0]

  if (child) {
    root.replaceChild(node, child)
  } else {
    root.appendChild(node)
  }

  return node
}

function patchChild (node, _old, _new) {
  const patches = diff(_old, _new)
  return patch(node, patches)
}

module.exports = function render (instance, root) {
  const old = getFromCache(root, instance.name)
  const node = (
    old
    ? patchChild(old.node, old.instance, instance)
    : replaceChild(root, create(instance))
  )

  setInCache(root, {instance, node})
  return node
}
