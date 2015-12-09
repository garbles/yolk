import { default as Yolk } from 'yolk'

module.exports = function renderInDoc (instance) {
  const node = document.createElement(`div`)

  document.body.appendChild(node)
  Yolk.render(instance, node)

  const cleanup = () => document.body.removeChild(node)

  return [node.firstChild, cleanup]
}
