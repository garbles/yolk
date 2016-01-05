import {createElement} from '../createElement'
import {VirtualNode} from '../VirtualNode'

describe(`createElement`, () => {
  it(`creates an HTMLElement`, () => {
    const vnode = new VirtualNode(`span`, {id: `hello`}, [new VirtualNode(`p`), new VirtualNode(`strong`)])
    const node = createElement(vnode)

    assert.equal(node.tagName, `span`)
    assert.equal(node.id, `hello`)
    assert.equal(node.children.length, 2)
  })
})
