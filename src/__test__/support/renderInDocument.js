import document from 'global/document'
import {uuid} from 'yolk/uuid'
import {render} from 'yolk/render'

export function renderInDocument (vnode) {
  const node = document.createElement(`div`)
  const selector = `app-${uuid()}`
  document.body.appendChild(node)
  node.setAttribute(`id`, selector)

  const cleanup = () => document.body.removeChild(node)

  render(vnode, `#${selector}`)

  return {node: node.firstChild, cleanup}
}
