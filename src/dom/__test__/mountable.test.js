/* @flow weak */

import {emitMount, emitUnmount} from '../mountable'
import {addEventListener, removeEventListener} from '../eventDelegator'
import {VirtualElement} from '../VirtualElement'
import {render} from '../render'

describe(`emitMount`, () => {
  it(`emits a mount event in a given node after it is inserted into the DOM`, done => {
    const node = document.createElement(`div`)

    document.body.appendChild(node)

    // ensure that callback gets called
    const callback = () => done()
    addEventListener(node, `mount`, callback)
    emitMount(node, callback)

    document.body.removeChild(node)
  })

  it(`does not emit a mount event if it is not mounted`, () => {
    const node = document.createElement(`div`)

    // ensure that callback does not get called
    const callback = () => assert.notOk(true)
    addEventListener(node, `mount`, callback)
    emitMount(node, callback)
  })

  it(`does not emit a mount event if a function is not given`, () => {
    const node = document.createElement(`div`)
    document.body.appendChild(node)

    // ensure that callback does not get called
    const callback = () => assert.notOk(true)
    addEventListener(node, `mount`, callback)
    emitMount(node)

    document.body.removeChild(node)
  })

  // it(`calls onMount event when a virtual element is inserted into the DOM`, done => {
  //   const container = document.createElement(`div`)
  //   const onMount = () => done()
  //   const vnode = new VirtualElement(`div`, {onMount})
  //   document.body.appendChild(container)

  //   render(vnode, container)

  //   document.body.removeChild(container)
  // })
})

describe(`emitUnmount`, () => {
  it(`emits a mount event in a given node after it is inserted into the DOM`, done => {
    const node = document.createElement(`div`)
    document.body.appendChild(node)

    // ensure that callback gets called
    const callback = () => done()
    addEventListener(node, `unmount`, callback)
    emitUnmount(node, callback)

    document.body.removeChild(node)
  })

  it(`does not emit a mount event if it is not mounted`, () => {
    const node = document.createElement(`div`)

    // ensure that callback does not get called
    const callback = () => assert.notOk(true)
    addEventListener(node, `unmount`, callback)
    emitUnmount(node, callback)
  })

  it(`does not emit a mount event if a function is not given`, () => {
    const node = document.createElement(`div`)
    document.body.appendChild(node)

    // ensure that callback does not get called
    const callback = () => assert.notOk(true)
    addEventListener(node, `unmount`, callback)
    emitUnmount(node)

    document.body.removeChild(node)
  })
})
