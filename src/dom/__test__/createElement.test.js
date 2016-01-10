import document from 'global/document'
import {createElement} from '../createElement'
import {VirtualNode} from '../VirtualNode'

describe(`createElement`, () => {
  it(`creates an HTMLElement that can push props`, done => {
    const vnode = new VirtualNode(`div`, { width: 55 }, [new VirtualNode(`p`, {}, [], `blurg`)])
    const node = createElement(vnode)

    document.body.appendChild(node)

    assert.equal(node.tagName, `div`)
    assert.equal(node.width, 55)
    assert.equal(node.children.length, 1)
    assert.equal(vnode.children[0].key, `blurg`)

    // temp
    vnode.props$.next({width: 400})

    assert.equal(node.width, 400)

    vnode.props$.next({})

    assert.equal(node.width, undefined)

    // ensure that click handler is working
    const onClick = () => done()
    vnode.props$.next({onClick})

    // real event handler is not attached to DOM node
    assert.notOk(node.onclick)

    const event = document.createEvent(`MouseEvent`)
    event.initMouseEvent(`click`)
    node.dispatchEvent(event)

    document.removeChild(node)
  })
})
