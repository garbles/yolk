import {createElement} from '../createElement'
import {VirtualNode} from '../VirtualNode'

describe(`createElement`, () => {
  it(`creates an HTMLElement with children`, () => {
    const vnode = new VirtualNode(`span`, { width: 55 }, [new VirtualNode(`p`), new VirtualNode(`strong`)])
    const node = createElement(vnode)

    assert.equal(node.tagName, `span`)
    assert.equal(node.width, 55)

    // temp
    vnode.props$.next({width: 400})

    assert.equal(node.width, 400)

    vnode.props$.next({})

    assert.equal(node.width, undefined)

    // assert.equal(node.children.length, 2)
  })
})
