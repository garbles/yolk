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
    const width = new BehaviorSubject(55)
    const height = new BehaviorSubject(100)
    const children = new BehaviorSubject([h(`strong`), h(`p`)])

    const vnode = h(`div`, { className: `cool`}, [
      h(`span`, {width: width}),
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

    const width = new BehaviorSubject(550)
    const height = new BehaviorSubject(1000)
    const children = new BehaviorSubject([h(`p`), h(`div`)])

    assert.equal(node.children[0].children[0].width, 550)
    assert.equal(node.children[0].children[1].height, 1000)
    assert.equal(node.children[0].children[1].children.length, 2)
    assert.equal(node.children[0].children[1].children[0].tagName, `p`)
    assert.equal(node.children[0].children[1].children[1].tagName, `div`)
  })
})
