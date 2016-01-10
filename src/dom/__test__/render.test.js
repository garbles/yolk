import document from 'global/document'
import {render} from '../render'
import {VirtualElement} from '../VirtualElement'

describe(`render`, () => {
  it(`renders a virtual node into a container`, () => {
    const container = document.createElement(`div`)
    const vnode = new VirtualElement(`span`)

    render(vnode, container)

    assert.equal(container.children.length, 1)
    assert.equal(container.firstChild.tagName, `span`)
  })
})
