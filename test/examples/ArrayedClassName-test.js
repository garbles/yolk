const test = require(`tape`)
const Yolk = require(`yolk`) // eslint-disable-line no-unused-vars
const renderInDoc = require(`../helpers/renderInDoc`)

test(`ArrayedClassName: an arrayed list of classes`, t => {
  t.plan(1)

  const component = <div className={[`a`, `b`, `c`, undefined, false, null, `g`]} />
  const [node, cleanup] = renderInDoc(component)

  t.equal(node.className, `a b c g`)
  cleanup()
})
