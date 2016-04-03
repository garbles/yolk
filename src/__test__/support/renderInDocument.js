import document from 'global/document'
import cuid from 'cuid'
import {render} from 'render'

export function renderInDocument (vnode) {
  const node = document.createElement(`div`)
  const selector = `app-${cuid()}`
  document.body.appendChild(node)
  node.setAttribute(`id`, selector)

  const cleanup = () => document.body.removeChild(node)

  render(vnode, `#${selector}`)

  return {node: node.firstChild, cleanup}
}
