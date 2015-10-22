const test = require(`tape`)
const Yolk = require(`yolk`)

test(`addings and removing props after the initial render`, t => {
  t.plan(1)

  const component = <div key="first" />
  const nextComponent = <div className="some-class" key="second" />

  const node = document.createElement(`div`)
  document.body.appendChild(node)
  Yolk.render(component, node)
  Yolk.render(nextComponent, node)

  t.equal(node.innerHTML, `<div class="some-class"></div>`)
})
