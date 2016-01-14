import document from 'global/document'
import {render} from '../render'
import {VirtualElement} from '../VirtualElement'
import {BehaviorSubject} from 'rxjs/subject/BehaviorSubject'

function renderInDocument (vnode) {
  const node = document.createElement(`div`)
  document.body.appendChild(node)

  const cleanup = () => document.body.removeChild(node)

  render(vnode, node)

  return {node, cleanup}
}

function h (...args) {
  return new VirtualElement(...args)
}

describe(`render`, () => {
  it.only(`renders a virtual node into a container`, () => {
    let mountCallbackCount = 0
    let unmountCallbackCount = 0
    const onMount = () => mountCallbackCount += 1
    const onUnmount = () => unmountCallbackCount += 1
    const width = new BehaviorSubject(55)
    const height = new BehaviorSubject(100)
    const children = new BehaviorSubject([h(`strong`, {onUnmount}), h(`p`, {onUnmount})])

    const vnode = h(`div`, {className: `cool`, onMount}, [
      h(`span`, {width: width, onMount}),
      h(`div`, {height: height}, [children]),
    ])

    const {node, cleanup} = renderInDocument(vnode)

    assert.equal(node.children.length, 1)
    assert.equal(node.children[0].tagName, `div`)
    assert.equal(node.children[0].className, `cool`)
    assert.equal(node.children[0].children.length, 2)
    assert.equal(node.children[0].children[0].tagName, `span`)
    assert.equal(node.children[0].children[0].width, 55)
    assert.equal(node.children[0].children[1].tagName, `div`)
    assert.equal(node.children[0].children[1].height, 100)
    assert.equal(node.children[0].children[1].children.length, 2)
    assert.equal(node.children[0].children[1].children[0].tagName, `strong`)
    assert.equal(node.children[0].children[1].children[1].tagName, `p`)


    const otherChildren = new BehaviorSubject(h(`strong`, {onMount}))
    width.next(550)
    height.next(1000)
    children.next([h(`p`), h(`div`, {onMount}, [otherChildren])])

    assert.equal(node.children[0].children[0].width, 550)
    assert.equal(node.children[0].children[1].height, 1000)
    assert.equal(node.children[0].children[1].children.length, 2)
    assert.equal(node.children[0].children[1].children[0].tagName, `p`)
    assert.equal(node.children[0].children[1].children[1].tagName, `div`)
    assert.equal(node.children[0].children[1].children[1].children.length, 1)
    assert.equal(node.children[0].children[1].children[1].children[0].tagName, `strong`)

    assert.equal(mountCallbackCount, 4)
    assert.equal(unmountCallbackCount, 1)
  })
})
