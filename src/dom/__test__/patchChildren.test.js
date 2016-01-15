/* @flow weak */

import document from 'global/document'
import {patchChildren} from '../patchChildren'
import {h} from '../h'

function createEmptyVnode (tag, key) {
  return h(tag || `p`, {key})
}

function createEmptyVNodes (tag, mapping) {
  return mapping.map(key => createEmptyVnode(tag, key))
}

describe(`patchChildren`, () => {
  it(`creates children`, () => {
    const node = document.createElement(`div`)
    const children: Array<VirtualElement> = createEmptyVNodes(`p`, [null, null])

    patchChildren(node, children, [])

    assert.equal(node.children.length, 2)
  })

  it(`destroys children`, () => {
    const node = document.createElement(`div`)
    const children: Array<VirtualElement> = createEmptyVNodes(`p`, [null, null])

    patchChildren(node, children, [])
    patchChildren(node, [], children)

    assert.equal(node.children.length, 0)
  })

  it(`patches children`, () => {
    const node = document.createElement(`div`)
    const children: Array<VirtualElement> = [h(`p`)]
    const next: Array<VirtualElement> = [h(`p`, {id: `next`})]
    const doubleNext: Array<VirtualElement> = [h(`p`, {id: `double-next`})]

    let result: Array<VirtualElement> = patchChildren(node, children, [])
    assert.equal(node.firstElementChild.width, undefined)

    result = patchChildren(node, next, result)
    assert.equal(node.firstElementChild.id, `next`)

    patchChildren(node, doubleNext, result)
    assert.equal(node.firstElementChild.id, `double-next`)
  })

  it(`rearranges children with keys`, () => {
    const node = document.createElement(`div`)
    const children: Array<VirtualElement> = createEmptyVNodes(`p`, [`a`, null, `b`])
    const next: Array<VirtualElement> = createEmptyVNodes(`p`, [null, `b`, `a`])

    patchChildren(node, children, [])

    node.children[0].__specialTag__ = `@@first`
    node.children[1].__specialTag__ = `@@second`
    node.children[2].__specialTag__ = `@@third`

    assert.equal(node.children.length, 3)
    assert.equal(node.children[0].__specialTag__, `@@first`)
    assert.equal(node.children[1].__specialTag__, `@@second`)
    assert.equal(node.children[2].__specialTag__, `@@third`)

    patchChildren(node, next, children)

    assert.equal(node.children[0].__specialTag__, `@@second`)
    assert.equal(node.children[1].__specialTag__, `@@third`)
    assert.equal(node.children[2].__specialTag__, `@@first`)
  })

  it(`removes children but preserves the appropriate keyed elements`, () => {
    const node = document.createElement(`div`)
    const children: Array<VirtualElement> = createEmptyVNodes(`p`, [`a`, null, null, null, `b`])
    const next: Array<VirtualElement> = createEmptyVNodes(`p`, [`b`, `a`, `c`, null])
    const doubleNext: Array<VirtualElement> = createEmptyVNodes(`p`, [`c`, `a`, null])

    let result: Array<VirtualElement> = patchChildren(node, children, [])

    node.children[1].__specialTag__ = `@@removed`
    node.children[3].__specialTag__ = `@@unkeyed`
    node.children[4].__specialTag__ = `@@keyed`

    assert.equal(node.children.length, 5)
    assert.equal(result.length, 5)
    assert.equal(result[0].key, `a`)
    assert.equal(result[1].key, null)
    assert.equal(result[2].key, null)
    assert.equal(result[3].key, null)
    assert.equal(result[4].key, `b`)

    result = patchChildren(node, next, result)

    assert.equal(node.children.length, 4)
    assert.equal(result.length, 4)
    assert.equal(result[0].key, `b`)
    assert.equal(result[1].key, `a`)
    assert.equal(result[2].key, `c`)
    assert.equal(result[3].key, null)
    assert.equal(node.children[0].__specialTag__, `@@keyed`)
    assert.equal(node.children[3].__specialTag__, `@@unkeyed`)

    for (let i = 0; i < node.children.length; i++) {
      const child = node.children[i]
      assert.notEqual(child.__specialTag__, `@@removed`)
    }

    result = patchChildren(node, doubleNext, result)

    assert.equal(node.children.length, 3)
    assert.equal(result.length, 3)
    assert.equal(result[0].key, `c`)
    assert.equal(result[1].key, `a`)
    assert.equal(result[2].key, null)
  })

  it(`removes children if their key does not match the same tagName`, () => {
    const node = document.createElement(`div`)
    const children: Array<VirtualElement> = createEmptyVNodes(`p`, [null])
    const next: Array<VirtualElement> = createEmptyVNodes(`div`, [null])

    let result: Array<VirtualElement> = patchChildren(node, children, [])

    node.children[0].__specialTag__ = `@@paragraph`

    assert.equal(node.children.length, 1)
    assert.equal(node.firstElementChild.tagName, `p`)
    assert.equal(node.firstElementChild.__specialTag__, `@@paragraph`)

    result = patchChildren(node, next, result)

    assert.equal(node.children.length, 1)
    assert.equal(node.firstElementChild.tagName, `div`)
    assert.equal(node.firstElementChild.__specialTag__, undefined)
  })

  it(`replaces children of children`, () => {
    const node = document.createElement(`div`)
    const children: Array<VirtualElement> = createEmptyVNodes(`p`, [null])
    children[0].children = createEmptyVNodes(`span`, [null, `b`])

    const next: Array<VirtualElement> = createEmptyVNodes(`p`, [null])
    next[0].children = createEmptyVNodes(`span`, [`b`, `a`, `c`, null])

    let result: Array<VirtualElement> = patchChildren(node, children, [])
    const childNode = node.firstElementChild

    assert.equal(node.children.length, 1)
    assert.equal(childNode.tagName, `p`)
    assert.equal(childNode.children.length, 2)

    childNode.children[1].__specialTag__ = `@@keyed`

    result = patchChildren(node, next, result)

    assert.equal(node.children.length, 1)
    assert.equal(childNode.tagName, `p`)
    assert.equal(childNode.children.length, 4)
    assert.equal(childNode.children[0].__specialTag__, `@@keyed`)
  })
})
