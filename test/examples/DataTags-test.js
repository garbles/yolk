import { default as test } from 'tape'
import { default as Yolk } from 'yolk' // eslint-disable-line no-unused-vars
import { default as renderInDoc } from '../helpers/renderInDoc'

test(`DataTags: using data tags`, t => {
  t.plan(2)
  t.timeoutAfter(100)

  const component = <div data={{something: 55, otherReallyCoolThing: `123123`}} />
  const [node, cleanup] = renderInDoc(component)

  t.equal(node.dataset.something, `55`)
  t.equal(node.dataset.otherReallyCoolThing, `123123`)

  cleanup()
})
