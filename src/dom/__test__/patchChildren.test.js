import document from 'global/document'
import {patchChildren} from '../patchChildren'
import {VirtualNode} from '../VirtualNode'

function createEmptyVNodes (tag, mapping) {
  return mapping.map((key, i) => createEmptyVnode(tag, key || i))
}

function createEmptyVnode (tag, key) {
  return new VirtualNode(tag || `p`, {}, [], key)
}

describe(`patchChildren`, () => {
  it(`creates children`, () => {
    const node = document.createElement(`div`)
    const children = createEmptyVNodes(`p`, [null, null])

    patchChildren(node, children, [])

    assert.equal(node.children.length, 2)
  })

  it(`destroys children`, () => {
    const node = document.createElement(`div`)
    const children = createEmptyVNodes(`p`, [null, null])

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
    const children = createEmptyVNodes(`p`, [`a`, null, `b`])
    const next = createEmptyVNodes(`p`, [null, `b`, `a`])

    patchChildren(node, children, [])

    node.children[0].__specialTag__ = `@@first`
    node.children[1].__specialTag__ = `@@second`
    node.children[2].__specialTag__ = `@@third`

    assert.equal(node.children.length, 3)
    assert.equal(node.children[0].__specialTag__, `@@first`)
    assert.equal(node.children[1].__specialTag__, `@@second`)
    assert.equal(node.children[2].__specialTag__, `@@third`)

    patchChildren(node, next, children)

    assert.equal(node.children[0].__specialTag__, undefined)
    assert.equal(node.children[1].__specialTag__, `@@third`)
    assert.equal(node.children[2].__specialTag__, `@@first`)
  })

  it(`removes children but preserves the appropriate keyed elements`, () => {
    const node = document.createElement(`div`)
    const children = createEmptyVNodes(`p`, [`a`, null, null, null, `b`])
    const next = createEmptyVNodes(`p`, [`b`, `a`, `c`, null])
    const doubleNext = createEmptyVNodes(`p`, [`c`, `a`, null])

    let result = patchChildren(node, children, [])

    node.children[1].__specialTag__ = `@@removed`
    node.children[3].__specialTag__ = `@@unkeyed`
    node.children[4].__specialTag__ = `@@keyed`

    assert.equal(node.children.length, 5)
    assert.equal(result.length, 5)
    assert.equal(result[0].key, `a`)
    assert.equal(result[1].key, 1)
    assert.equal(result[2].key, 2)
    assert.equal(result[3].key, 3)
    assert.equal(result[4].key, `b`)

    result = patchChildren(node, next, result)

    assert.equal(node.children.length, 4)
    assert.equal(result.length, 4)
    assert.equal(result[0].key, `b`)
    assert.equal(result[1].key, `a`)
    assert.equal(result[2].key, `c`)
    assert.equal(result[3].key, 3)
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
    assert.equal(result[2].key, 2)

    for (let i = 0; i < node.children.length; i++) {
      const child = node.children[i]
      assert.notEqual(child.__specialTag__, `@@keyed`)
      assert.notEqual(child.__specialTag__, `@@unkeyed`)
    }
  })

  it(`removes children if their key does not match the same tagName`, () => {
    const node = document.createElement(`div`)
    const children = createEmptyVNodes(`p`, [null])
    const next = createEmptyVNodes(`div`, [null])

    let result = patchChildren(node, children, [])

    assert.equal(node.children.length, 1)
    assert.equal(node.firstChild.tagName, `p`)

    result = patchChildren(node, next, result)

    assert.equal(node.children.length, 1)
    assert.equal(node.firstChild.tagName, `div`)
  })
})
