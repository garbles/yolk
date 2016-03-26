/* @flow weak */

import document from 'global/document'
import {VirtualNode} from '../VirtualNode'
import {NodeProxy} from '../NodeProxy'
import {createPatchChildren} from '../createPatchChildren'
import {h} from '../h'

function createEmptyVnode (tag, key) {
  return h(tag || `p`, {key})
}

function createEmptyVNodes (tag, mapping) {
  return mapping.map(key => createEmptyVnode(tag, key))
}

describe(`patchChildren`, () => {
  it(`creates children`, () => {
    const node = h(`div`)
    node.initialize()

    const children: Array<VirtualNode> = createEmptyVNodes(`p`, [null, null])
    const patchChildren = createPatchChildren(node)

    patchChildren(children, [])

    assert.equal(node.getNodeProxy().children().length, 2)
  })

  it(`destroys children`, () => {
    const node = h(`div`)
    node.initialize()

    const children: Array<VirtualNode> = createEmptyVNodes(`p`, [null, null])
    const patchChildren = createPatchChildren(node)

    patchChildren(children, [])
    patchChildren([], children)

    assert.equal(node.getNodeProxy().children().length, 0)
  })

  it(`patches children`, () => {
    const node = h(`div`)
    node.initialize()

    const children: Array<VirtualNode> = [h(`p`)]
    const next: Array<VirtualNode> = [h(`p`, {id: `next`})]
    const doubleNext: Array<VirtualNode> = [h(`p`, {id: `double-next`})]
    const patchChildren = createPatchChildren(node)

    let result: Array<VirtualNode> = patchChildren(children)

    patchChildren(next)
    assert.equal(node.getNodeProxy().children()[0].id, `next`)

    patchChildren(doubleNext)
    assert.equal(node.getNodeProxy().children()[0].id, `double-next`)
  })

  it(`rearranges children with keys`, () => {
    const node = h(`div`)
    node.initialize()

    const children: Array<VirtualNode> = createEmptyVNodes(`p`, [`a`, null, `b`])
    const next: Array<VirtualNode> = createEmptyVNodes(`p`, [null, `b`, `a`])
    const patchChildren = createPatchChildren(node)

    patchChildren(children)

    node.getNodeProxy().children()[0].__specialTag__ = `@@first`
    node.getNodeProxy().children()[1].__specialTag__ = `@@second`
    node.getNodeProxy().children()[2].__specialTag__ = `@@third`

    assert.equal(node.getNodeProxy().children().length, 3)
    assert.equal(node.getNodeProxy().children()[0].__specialTag__, `@@first`)
    assert.equal(node.getNodeProxy().children()[1].__specialTag__, `@@second`)
    assert.equal(node.getNodeProxy().children()[2].__specialTag__, `@@third`)

    patchChildren(next)

    assert.equal(node.getNodeProxy().children()[0].__specialTag__, `@@second`)
    assert.equal(node.getNodeProxy().children()[1].__specialTag__, `@@third`)
    assert.equal(node.getNodeProxy().children()[2].__specialTag__, `@@first`)
  })

  it(`removes children but preserves the appropriate keyed elements`, () => {
    const node = h(`div`)
    node.initialize()

    const children: Array<VirtualNode> = createEmptyVNodes(`p`, [`a`, null, null, null, `b`])
    const next: Array<VirtualNode> = createEmptyVNodes(`p`, [`b`, `a`, `c`, null])
    const doubleNext: Array<VirtualNode> = createEmptyVNodes(`p`, [`c`, `a`, null])

    const patchChildren = createPatchChildren(node)

    let result: Array<VirtualNode> = patchChildren(children)

    node.getNodeProxy().children()[1].__specialTag__ = `@@removed`
    node.getNodeProxy().children()[3].__specialTag__ = `@@unkeyed`
    node.getNodeProxy().children()[4].__specialTag__ = `@@keyed`

    assert.equal(node.getNodeProxy().children().length, 5)
    assert.equal(result.length, 5)
    assert.equal(result[0].key, `a`)
    assert.equal(result[1].key, null)
    assert.equal(result[2].key, null)
    assert.equal(result[3].key, null)
    assert.equal(result[4].key, `b`)

    result = patchChildren(next)

    assert.equal(node.getNodeProxy().children().length, 4)
    assert.equal(result.length, 4)
    assert.equal(result[0].key, `b`)
    assert.equal(result[1].key, `a`)
    assert.equal(result[2].key, `c`)
    assert.equal(result[3].key, null)
    assert.equal(node.getNodeProxy().children()[0].__specialTag__, `@@keyed`)
    assert.equal(node.getNodeProxy().children()[3].__specialTag__, `@@unkeyed`)

    for (let i = 0; i < node.getNodeProxy().children().length; i++) {
      const child = node.getNodeProxy().children()[i]
      assert.notEqual(child.__specialTag__, `@@removed`)
    }

    result = patchChildren(doubleNext)

    assert.equal(node.getNodeProxy().children().length, 3)
    assert.equal(result.length, 3)
    assert.equal(result[0].key, `c`)
    assert.equal(result[1].key, `a`)
    assert.equal(result[2].key, null)
  })

  it(`removes children if their key does not match the same tagName`, () => {
    const node = h(`div`)
    node.initialize()

    const children: Array<VirtualNode> = createEmptyVNodes(`p`, [null])
    const next: Array<VirtualNode> = createEmptyVNodes(`div`, [null])
    const patchChildren = createPatchChildren(node)

    let result: Array<VirtualNode> = patchChildren(children)

    node.getNodeProxy().children()[0].__specialTag__ = `@@paragraph`

    assert.equal(node.getNodeProxy().children().length, 1)
    assert.equal(node.getNodeProxy().children()[0].tagName, `P`)
    assert.equal(node.getNodeProxy().children()[0].__specialTag__, `@@paragraph`)

    patchChildren(next)

    assert.equal(node.getNodeProxy().children().length, 1)
    assert.equal(node.getNodeProxy().children()[0].tagName, `DIV`)
    assert.equal(node.getNodeProxy().children()[0].__specialTag__, undefined)
  })

  it(`replaces children of children`, () => {
    const node = h(`div`)
    node.initialize()

    const patchChildren = createPatchChildren(node)
    const children: Array<VirtualNode> = createEmptyVNodes(`p`, [null])
    children[0]._children = createEmptyVNodes(`span`, [null, `b`])

    const next: Array<VirtualNode> = createEmptyVNodes(`p`, [null])
    next[0]._children = createEmptyVNodes(`span`, [`b`, `a`, `c`, null])

    patchChildren(children)

    let childNode = node.getNodeProxy().children()[0]

    assert.equal(node.getNodeProxy().children().length, 1)
    assert.equal(childNode.tagName, `P`)
    assert.equal(childNode.children.length, 2)

    childNode.children[1].__specialTag__ = `@@keyed`

    patchChildren(next)

    childNode = node.getNodeProxy().children()[0]

    assert.equal(node.getNodeProxy().children().length, 1)
    assert.equal(childNode.tagName, `P`)
    assert.equal(childNode.children.length, 4)
    assert.equal(childNode.children[0].__specialTag__, `@@keyed`)
  })
})
