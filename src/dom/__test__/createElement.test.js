/* @flow weak */

import document from 'global/document'
import {createNode} from '../createNode'
import {VirtualElement} from '../VirtualElement'

describe(`createNode`, () => {
  it(`creates an HTMLElement that can push props`, done => {
    const vnode: VirtualElement = new VirtualElement(`div`, { id: `first` }, [new VirtualElement(`p`, {}, [], `blurg`)])
    const node: HTMLElement = createNode(vnode)

    document.body.appendChild(node)

    assert.equal(node.tagName, `div`)
    assert.equal(node.id, `first`)
    assert.equal(node.children.length, 1)
    assert.equal(vnode.children[0].key, `blurg`)

    // temp
    vnode.props$.next({id: `second`})

    assert.equal(node.id, `second`)

    // ensure that click handler is working
    const onClick = () => done()
    vnode.props$.next({onClick})

    // real event handler is not attached to DOM node
    assert.notOk(node.getAttribute(`onclick`))

    const event = document.createEvent(`MouseEvent`)
    event.initMouseEvent(`click`)
    node.dispatchEvent(event)

    document.removeChild(node)
  })
})
