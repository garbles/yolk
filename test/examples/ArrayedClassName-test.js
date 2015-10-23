const test = require(`tape`)
const Yolk = require(`yolk`)
const renderInDoc = require(`../helpers/renderInDoc`)

test(`an arrayed list of classes`, t => {
  t.plan(1)

  const component = <div className={[`a`, `b`, `c`, undefined, false, null, `g`]} />
  const [node, cleanup] = renderInDoc(component)

  t.equal(node.innerHTML, `<div class="a b c g"></div>`)
  cleanup()
})
