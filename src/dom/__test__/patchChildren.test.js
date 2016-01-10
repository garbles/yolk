import document from 'global/document'
import {patchChildren} from '../patchChildren'
import {VirtualElement} from '../VirtualElement'

function createEmptyVNodes (tag, mapping) {
  return mapping.map((key, i) => createEmptyVnode(tag, key))
}

function createEmptyVnode (tag, key) {
  return new VirtualElement(tag || `p`, {}, [], key)
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
    const children = [new VirtualElement(`p`, {}, [], 0)]
    const next = [new VirtualElement(`p`, {width: 55}, [], 0)]
    const doubleNext = [new VirtualElement(`p`, {width: 100}, [], 0)]

    let result = patchChildren(node, children, [])
    assert.equal(node.firstChild.width, undefined)

    result = patchChildren(node, next, result)
    assert.equal(node.firstChild.width, 55)

    patchChildren(node, doubleNext, result)
    assert.equal(node.firstChild.width, 100)
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

    assert.equal(node.children[0].__specialTag__, `@@second`)
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
    const children = createEmptyVNodes(`p`, [null])
    const next = createEmptyVNodes(`div`, [null])

    let result = patchChildren(node, children, [])

    node.children[0].__specialTag__ = `@@paragraph`

    assert.equal(node.children.length, 1)
    assert.equal(node.firstChild.tagName, `p`)
    assert.equal(node.firstChild.__specialTag__, `@@paragraph`)

    result = patchChildren(node, next, result)

    assert.equal(node.children.length, 1)
    assert.equal(node.firstChild.tagName, `div`)
    assert.equal(node.firstChild.__specialTag__, undefined)
  })

  it(`replaces children of children`, () => {
    const node = document.createElement(`div`)
    const children = createEmptyVNodes(`p`, [null])
    children[0].children = createEmptyVNodes(`span`, [null, `b`])

    const next = createEmptyVNodes(`p`, [null])
    next[0].children = createEmptyVNodes(`span`, [`b`, `a`, `c`, null])

    let result = patchChildren(node, children, [])
    const childNode = node.firstChild

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
