const test = require(`tape`)
const Yolk = require(`yolk`)

test(`an arrayed list of classes`, t => {
  t.plan(1)

  const component = <div className={[`a`, `b`, `c`, undefined, false, null, `g`]} />
  const node = document.createElement(`div`)
  Yolk.render(component, node)

  t.equal(node.innerHTML, `<div class="a b c g"></div>`)
})
