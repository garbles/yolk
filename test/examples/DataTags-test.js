const test = require(`tape`)
const Yolk = require(`yolk`) // eslint-disable-line no-unused-vars
const renderInDoc = require(`../helpers/renderInDoc`)

test(`using data tags`, t => {
  t.plan(2)
  t.timeoutAfter(100)

  const component = <div data={{something: 55, otherReallyCoolThing: `123123`}} />
  const [wrapper, cleanup] = renderInDoc(component)
  const node = wrapper.firstChild

  t.equal(node.dataset.something, `55`)
  t.equal(node.dataset.otherReallyCoolThing, `123123`)

  cleanup()
})
