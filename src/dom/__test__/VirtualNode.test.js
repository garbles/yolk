import {VirtualNode} from '../VirtualNode'

describe(`VirtualNode`, () => {
  it(`creates an empty VirtualNode`, () => {
    const vnode = new VirtualNode(`span`)

    assert.equal(vnode.tagName, `span`)
    assert.deepEqual(vnode.props, {})
    assert.deepEqual(vnode.children, [])
  })

  it(`creates a VirtualNode with props`, () => {
    const props = {color: `red`, height: 5}
    const vnode = new VirtualNode(`span`, props)

    assert.deepEqual(vnode.props, props)
  })
})
