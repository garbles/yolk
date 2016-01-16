import {VirtualElement} from '../VirtualElement'

describe(`VirtualElement`, () => {
  it(`creates a VirtualElement with props`, () => {
    const props = {color: `red`, height: 5}
    const vnode = new VirtualElement(`span`, props, [])

    assert.deepEqual(vnode.props, props)
  })
})
