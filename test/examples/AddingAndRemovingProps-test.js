const test = require(`tape`)
const Yolk = require(`yolk`)
const renderInDoc = require(`../helpers/renderInDoc`)

test(`AddingAndRemovingProps: addings and removing props after the initial render`, t => {
  t.plan(1)

  const component = <div key="first" />
  const nextComponent = <div className="some-class" key="second" />
  const [node, cleanup] = renderInDoc(component)
  const parent = node.parentNode
  Yolk.render(nextComponent, parent)

  t.equal(parent.firstChild.className, `some-class`)

  cleanup()
})
