import document from 'global/document'
import {render} from '../render'
import {VirtualNode} from '../VirtualNode'

describe(`render`, () => {
  it(`renders a virtual node into a container`, () => {
    const container = document.createElement(`div`)
    const vnode = new VirtualNode(`span`)

    render(vnode, container)

    assert.equal(container.children.length, 1)
    assert.equal(container.firstChild.tagName, `span`)
  })
})
