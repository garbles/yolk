/* eslint-disable no-use-before-define */

const test = require(`tape`)
const Yolk = require(`yolk`)
const renderInDoc = require(`../helpers/renderInDoc`)

test(`LifecycleHooks: will run code after the component mounts`, t => {
  t.plan(1)
  t.timeoutAfter(2000)

  function onMount (ev) {
    t.equal(ev.target.tagName, `STRONG`)
    cleanup()
  }

  const component = <strong onMount={onMount} />
  const cleanup = renderInDoc(component)[1]
})

test(`LifecycleHooks: will run code when the component unmounts`, t => {
  t.plan(2)
  t.timeoutAfter(2000)

  function onUnmount (ev) {
    t.equal(ev.target.tagName, `STRONG`)

    setTimeout(() => {
      t.equal(parent.firstChild.tagName, `B`)
      cleanup()
    }, 0)
  }

  const [node, cleanup] = renderInDoc(<strong onUnmount={onUnmount} />)
  const parent = node.parentNode

  Yolk.render(<b />, parent)
})
