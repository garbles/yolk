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
    const children = [new VirtualNode(`p`, {}, [], 0)]
    const next = [new VirtualNode(`p`, {width: 55}, [], 0)]

    patchChildren(node, children, [])
    assert.equal(node.firstChild.width, undefined)

    patchChildren(node, next, children)
    assert.equal(node.firstChild.width, 55)
  })

  it(`rearranges children with keys`, () => {
    const node = document.createElement(`div`)
    const children = [new VirtualNode(`p`, {}, [], `a`), new VirtualNode(`p`, {}, [], 1), new VirtualNode(`p`, {}, [], `b`)]
    const next = [new VirtualNode(`p`, {}, [], 0), new VirtualNode(`p`, {}, [], `b`), new VirtualNode(`p`, {}, [], `a`)]

    patchChildren(node, children, [])

    node.children[0].__specialTag__ = `@@first`
    node.children[1].__specialTag__ = `@@second`
    node.children[2].__specialTag__ = `@@third`

    assert.equal(node.children[0].__specialTag__, `@@first`)
    assert.equal(node.children[1].__specialTag__, `@@second`)
    assert.equal(node.children[2].__specialTag__, `@@third`)

    patchChildren(node, next, children)

    assert.equal(node.children[0].__specialTag__, undefined)
    assert.equal(node.children[1].__specialTag__, `@@third`)
    assert.equal(node.children[2].__specialTag__, `@@first`)
  })
})
