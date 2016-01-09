import document from 'global/document'
import {patchChildren} from '../patchChildren'
import {VirtualNode} from '../VirtualNode'

describe(`patchChildren`, () => {
  it(`creates children`, () => {
    const node = document.createElement(`div`)
    const children = [new VirtualNode(`p`, {}, [], 0), new VirtualNode(`p`, {}, [], 1)]

    patchChildren(node, children, [])

    assert.equal(node.children.length, 2)
  })

  it(`destroys children`, () => {
    const node = document.createElement(`div`)
    const children = [new VirtualNode(`p`, {}, [], 0), new VirtualNode(`p`, {}, [], 1)]

    patchChildren(node, children, [])
    patchChildren(node, [], children)

    assert.equal(node.children.length, 0)
  })

  it(`patches children`, () => {
    const node = document.createElement(`div`)
    const children = [new VirtualNode(`p`)]
    const next = [new VirtualNode(`p`, {width: 55}, [], 0)]

    patchChildren(node, children, [])
    assert.equal(node.firstChild.width, undefined)

    patchChildren(node, next, children)
    assert.equal(node.firstChild.width, 55)
  })

  it(`rearranges children without keys`, () => {
    const node = document.createElement(`div`)
    const children = [new VirtualNode(`strong`, {}, [], 0), new VirtualNode(`p`, {}, [], 1)]
    const next = [new VirtualNode(`p`, {}, [], 0), new VirtualNode(`strong`, {}, [], 1)]

    patchChildren(node, children, [])

    assert.equal(node.children.length, 2)
    assert.equal(node.children[0].tagName, `strong`)
    assert.equal(node.children[1].tagName, `p`)

    patchChildren(node, next, children)

    assert.equal(node.children.length, 2)
    assert.equal(node.children[0].tagName, `p`)
    assert.equal(node.children[1].tagName, `strong`)
  })

  it(`rearranges children with keys`, () => {
    const node = document.createElement(`div`)
    const children = [new VirtualNode(`p`, {}, [], 0), new VirtualNode(`p`, {}, [], `a`), new VirtualNode(`p`, {}, [], `b`)]
    const next = [new VirtualNode(`p`, {}, [], 0), new VirtualNode(`p`, {}, [], `b`), new VirtualNode(`p`, {}, [], `a`)]

    patchChildren(node, children, [])

    node.children[0].__specialTag__ = `@@first`
    node.children[1].__specialTag__ = `@@second`
    assert.equal(node.children[0].__specialTag__, `@@first`)
    assert.equal(node.children[1].__specialTag__, `@@second`)

    patchChildren(node, next, children)

    assert.equal(node.children[0].__specialTag__, `@@second`)
    assert.equal(node.children[1].__specialTag__, `@@first`)
  })
})
