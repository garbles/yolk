import { default as test } from 'tape'
import { h } from 'yolk' // eslint-disable-line no-unused-vars
import { default as renderInDoc } from '../helpers/renderInDoc'

test(`ArrayedClassName: an arrayed list of classes`, t => {
  t.plan(1)

  const component = <div className={[`a`, `b`, `c`, undefined, false, null, `g`]} />
  const [node, cleanup] = renderInDoc(component)

  t.equal(node.className, `a b c g`)
  cleanup()
})
