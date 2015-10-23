const test = require(`tape`)
const Yolk = require(`yolk`)
const renderInDoc = require(`../helpers/renderInDoc`)

test(`will run code after the component mounts`, t => {
  t.plan(2)
  t.timeoutAfter(500)

  function onMount (event) {
    t.equal(node.childElementCount, 1)
    t.equal(event.target.outerHTML, `<strong></strong>`)
    cleanup()
  }

  const component = <strong onMount={onMount} />
  const [node, cleanup] = renderInDoc(component)
})

test(`will run code when the component unmounts`, t => {
  t.plan(3)
  t.timeoutAfter(500)

  function onUnmount () {
    t.equal(node.childElementCount, 1)
    t.equal(event.target.outerHTML, `<strong></strong>`)
    t.equal(node.outerHTML, `<div><b></b></div>`)
    cleanup()
  }

  const component = <strong onUnmount={onUnmount} />
  const otherComponent = <b />
  const [node, cleanup] = renderInDoc(component)

  Yolk.render(otherComponent, node)
})
