import {VirtualNode} from '../VirtualNode'

describe(`VirtualNode`, () => {
  it(`creates a VirtualNode with props`, () => {
    const props = {color: `red`, height: 5}
    const vnode = new VirtualNode(`span`, props, [])

    assert.deepEqual(vnode.props, props)
  })
})
