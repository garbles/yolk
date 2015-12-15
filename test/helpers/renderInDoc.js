import { render } from 'yolk'

module.exports = function renderInDoc (instance) {
  const node = document.createElement(`div`)

  document.body.appendChild(node)
  render(instance, node)

  const cleanup = () => document.body.removeChild(node)

  return [node.firstChild, cleanup]
}
