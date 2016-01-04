/* @flow */

import {createElement} from '../createElement'
import {VirtualNode} from '../VirtualNode'

describe(`createElement`, () => {
  it(`creates an HTMLElement`, done => {
    const vnode = new VirtualNode(`span`, {draggable: true}, [new VirtualNode(`p`)])
    const node = createElement(vnode)

    if (node instanceof Element)  { // so flow won't complain about VirtualText
      assert.equal(node.tagName, `span`)
      assert.equal(node.draggable, true)
      assert.equal(node.children.length, 1)
      done()
    }
  })
})
