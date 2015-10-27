const test = require(`tape`)
const Yolk = require(`yolk`) // eslint-disable-line no-unused-vars
const renderInDoc = require(`../helpers/renderInDoc`)

test(`using data tags`, t => {
  t.plan(1)

  const component = <div dataSomething={55} dataOtherReallyCoolThing="123123" />
  const [node, cleanup] = renderInDoc(component)

  t.equal(node.innerHTML, `<div data-something="55" data-other-really-cool-thing="123123"></div>`)

  cleanup()
})
