import {VirtualElement} from '../VirtualElement'

describe(`VirtualElement`, () => {
  it(`creates an empty VirtualElement`, () => {
    const vnode = new VirtualElement(`span`)

    assert.equal(vnode.tagName, `span`)
    assert.deepEqual(vnode.props, {})
    assert.deepEqual(vnode.children, [])
  })

  it(`creates a VirtualElement with props`, () => {
    const props = {color: `red`, height: 5}
    const vnode = new VirtualElement(`span`, props)

    assert.deepEqual(vnode.props, props)
  })
})
