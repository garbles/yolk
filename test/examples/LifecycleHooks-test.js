const test = require(`tape`)
const Yolk = require(`../../lib/yolk`)

test(`will run code after the component mounts`, t => {
  t.plan(3)
  t.timeoutAfter(500)

  const node = document.createElement(`div`)

  function onMount (event) {
    t.equal(node.childElementCount, 1)
    t.equal(event.target.outerHTML, `<strong></strong>`)
    t.equal(node.outerHTML, `<div><strong></strong></div>`)
  }

  const component = <strong onMount={onMount} />

  Yolk.render(component, node)
})

test(`will run code when the component unmounts`, t => {
  t.plan(3)
  t.timeoutAfter(500)

  const node = document.createElement(`div`)

  function onUnmount (event) {
    t.equal(node.childElementCount, 1)
    t.equal(event.target.outerHTML, `<strong></strong>`)
    t.equal(node.outerHTML, `<div><b></b></div>`)
  }

  const component = <strong onUnmount={onUnmount} />
  const otherComponent = <b />

  Yolk.render(component, node)
  Yolk.render(otherComponent, node)
})
