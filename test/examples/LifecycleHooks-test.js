/* eslint-disable no-use-before-define */

const test = require(`tape`)
const Yolk = require(`yolk`)
const renderInDoc = require(`../helpers/renderInDoc`)

test(`LifecycleHooks: will run code after the component mounts`, t => {
  t.plan(2)
  t.timeoutAfter(2000)

  function onMount (ev) {
    t.equal(node.childElementCount, 1)
    t.equal(ev.target.outerHTML, `<strong></strong>`)
    cleanup()
  }

  const component = <strong onMount={onMount} />
  const [node, cleanup] = renderInDoc(component)
})

test(`LifecycleHooks: will run code when the component unmounts`, t => {
  t.plan(3)
  t.timeoutAfter(2000)

  function onUnmount (ev) {
    t.equal(node.childElementCount, 1)
    t.equal(ev.target.outerHTML, `<strong></strong>`)

    setTimeout(() => {
      t.equal(node.innerHTML, `<b></b>`)
      cleanup()
    }, 0)
  }

  const [node, cleanup] = renderInDoc(<strong onUnmount={onUnmount} />)

  Yolk.render(<b />, node)
})
