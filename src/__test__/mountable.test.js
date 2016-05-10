/* @flow weak */

import document from 'global/document'
import sinon from 'sinon/pkg/sinon'
import {renderInDocument} from './support/renderInDocument'
import {emitMount, emitUnmount} from '../mountable'
import {addEventListener} from '../eventDelegator'
import {h} from '../h'

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

  it(`does not emit a mount event if it is not mounted`, done => {
    const node = document.createElement(`div`)

    // ensure that callback does not get called
    const callback = sinon.spy()
    addEventListener(node, `mount`, callback)
    emitMount(node, callback)
    setTimeout(() => {
      done(callback.called ? new Error(`emitted mount event`) : null)
    }, 0)
  })

  it(`does not emit a mount event if a function is not given`, done => {
    const node = document.createElement(`div`)
    document.body.appendChild(node)

    // ensure that callback does not get called
    const callback = sinon.spy()
    addEventListener(node, `mount`, callback)
    emitMount(node)
    setTimeout(() => {
      done(callback.called ? new Error(`emitted mount event`) : null)
    }, 0)

    document.body.removeChild(node)
  })

  it(`calls onMount event when a virtual element is inserted into the DOM`, done => {
    const onMount = () => done()
    const vnode = h(`div`, {onMount})

    const {cleanup} = renderInDocument(vnode)

    cleanup()
  })
})

describe(`emitUnmount`, () => {
  it(`emits an unmount event in a given node after it is inserted into the DOM`, done => {
    const node = document.createElement(`div`)
    document.body.appendChild(node)

    // ensure that callback gets called
    const callback = () => done()
    addEventListener(node, `unmount`, callback)
    emitUnmount(node, callback)

    document.body.removeChild(node)
  })

  it(`does not emit an unmount event if it is not mounted`, done => {
    const node = document.createElement(`div`)

    // ensure that callback does not get called
    const callback = sinon.spy()
    addEventListener(node, `unmount`, callback)
    emitUnmount(node, callback)
    setTimeout(() => {
      done(callback.called ? new Error(`emitted unmount event`) : null)
    }, 0)
  })

  it(`does not emit an unmount event if a function is not given`, done => {
    const node = document.createElement(`div`)
    document.body.appendChild(node)

    // ensure that callback does not get called
    const callback = sinon.spy()
    addEventListener(node, `unmount`, callback)
    emitUnmount(node)
    setTimeout(() => {
      done(callback.called ? new Error(`emitted unmount event`) : null)
    }, 0)

    document.body.removeChild(node)
  })
})
