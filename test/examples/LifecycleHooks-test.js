/* eslint-disable no-use-before-define */

import { default as test } from 'tape'
import { default as Yolk } from 'yolk'
import { default as renderInDoc } from '../helpers/renderInDoc'

test(`LifecycleHooks: will run code after the component mounts`, t => {
  t.plan(1)
  t.timeoutAfter(2000)

  function onMount (ev) {
    t.equal(ev.target.tagName, `STRONG`)
    setTimeout(cleanup, 0)
  }

  const component = <strong onMount={onMount} />
  const cleanup = renderInDoc(component)[1]
})

test(`LifecycleHooks: will run code when the component unmounts`, t => {
  t.plan(2)
  t.timeoutAfter(2000)

  let node
  let cleanup

  function onUnmount (ev) {
    t.equal(ev.target.tagName, `STRONG`)

    setTimeout(() => {
      t.equal(parent.firstChild.tagName, `B`)
      cleanup()
    }, 0)
  }

  [node, cleanup] = renderInDoc(<strong onUnmount={onUnmount} />)
  const parent = node.parentNode

  Yolk.render(<b />, parent)
})
