import { default as test } from 'tape'
import { h } from 'yolk' // eslint-disable-line no-unused-vars
import { default as renderInDoc } from '../helpers/renderInDoc'

test(`AriaTags: using aria tags`, t => {
  t.plan(4)
  t.timeoutAfter(100)

  const component = <div aria={{hidden: false, labeledby: `parentId`}} />
  const [node, cleanup] = renderInDoc(component)

  t.equal(node.hasAttribute(`aria-hidden`), true)
  t.equal(node.getAttribute(`aria-hidden`), `false`)
  t.equal(node.hasAttribute(`aria-labeledby`), true)
  t.equal(node.getAttribute(`aria-labeledby`), `parentId`)

  cleanup()
})
