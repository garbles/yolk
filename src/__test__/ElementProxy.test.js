/* @flow */

import document from 'global/document'
import {ElementProxy} from '../ElementProxy'
import {TextProxy} from '../TextProxy'

describe(`ElementProxy`, () => {
  it(`creates an element node`, () => {
    const createdTagName = `div`
    const elementProxy = ElementProxy.createElement(createdTagName)

    const node = elementProxy._node
    assert.equal(node.nodeType, Node.ELEMENT_NODE)

    const expectedTagName = createdTagName.toUpperCase()
    assert.equal(node.tagName, expectedTagName)
  })

  const createTestElement = () => ElementProxy.createElement(`div`)
  const createTestTextNode = () => TextProxy.createTextNode(`some-text`)

  it(`appends a child`, () => {
    const testAppend = (createTestProxy, createTestProxy2) => {
      const parentProxy = ElementProxy.createElement(`div`)
      const children = parentProxy.children()

      assert.equal(children.length, 0)

      const childProxy = createTestProxy()
      parentProxy.insertChild(childProxy, children.length)

      assert.equal(children.length, 1)
      assert.equal(children[0], childProxy._node)

      const childProxy2 = createTestProxy2()
      parentProxy.insertChild(childProxy2, children.length)

      assert.equal(children.length, 2)
      assert.equal(children[1], childProxy2._node)
    }

    testAppend(createTestElement, createTestElement)
    testAppend(createTestElement, createTestTextNode)
    testAppend(createTestTextNode, createTestElement)
    testAppend(createTestTextNode, createTestTextNode)
  })

  it(`inserts a child before another child`, () => {
    const testInsertBefore = (createBeforeNode, createInsertedNode) => {
      const parentProxy = ElementProxy.createElement(`div`)
      const children = parentProxy.children()

      const beforeNodeProxy = createBeforeNode()
      parentProxy.insertChild(beforeNodeProxy, 0)

      // Confirm assumptions
      assert.equal(children.length, 1)
      assert.equal(children[0], beforeNodeProxy._node)

      const insertedNodeProxy = createInsertedNode()
      parentProxy.insertChild(insertedNodeProxy, 0)

      assert.equal(children.length, 2)
      assert.equal(children[0], insertedNodeProxy._node)
      assert.equal(children[1], beforeNodeProxy._node)
    }

    testInsertBefore(createTestElement, createTestElement)
    testInsertBefore(createTestElement, createTestTextNode)
    testInsertBefore(createTestTextNode, createTestElement)
    testInsertBefore(createTestTextNode, createTestTextNode)
  })

  it(`replaces a child`, () => {
    const testReplaceChild = (createNodeProxy, createReplacementProxy) => {
      const parentProxy = ElementProxy.createElement(`div`)
      const childProxies = [createNodeProxy(), createNodeProxy(), createNodeProxy()]
      const children = parentProxy.children()

      childProxies.forEach((childProxy, i) => parentProxy.insertChild(childProxy, i))

      // Confirm assumptions
      assert.ok(childProxies.every((childProxy, i) => childProxy._node === children[i]))

      const replacementNode = createReplacementProxy()
      parentProxy.replaceChild(replacementNode, 1)
      const expectedChildProxies = [childProxies[0], replacementNode, childProxies[2]]
      assert.ok(expectedChildProxies.every((expectedProxy, i) => expectedProxy._node === children[i]))
    }

    testReplaceChild(createTestElement, createTestElement)
    testReplaceChild(createTestElement, createTestTextNode)
    testReplaceChild(createTestTextNode, createTestElement)
    testReplaceChild(createTestTextNode, createTestTextNode)
  })

  it(`removes a child`, () => {
    const testRemoveChild = (createTestProxy, createTestProxy2) => {
      const parentProxy = ElementProxy.createElement(`div`)
      const children = parentProxy.children()

      const childProxy = createTestProxy()

      parentProxy.insertChild(childProxy, children.length)
      assert.equal(children.length, 1)
      assert.equal(children[0], childProxy._node)
      parentProxy.removeChild(childProxy)
      assert.equal(children.length, 0)

      const childProxy2 = createTestProxy2()

      parentProxy.insertChild(childProxy, children.length)
      parentProxy.insertChild(childProxy2, children.length)
      assert.equal(children.length, 2)

      parentProxy.removeChild(childProxy)
      assert.equal(children.length, 1)
      assert.equal(children[0], childProxy2._node)

      parentProxy.removeChild(childProxy2)
      assert.equal(children.length, 0)

      parentProxy.insertChild(childProxy, children.length)
      parentProxy.insertChild(childProxy2, children.length)
      assert.equal(children.length, 2)

      parentProxy.removeChild(childProxy2)
      assert.equal(children.length, 1)
      assert.equal(children[0], childProxy._node)

      parentProxy.removeChild(childProxy)
      assert.equal(children.length, 0)
    }

    testRemoveChild(createTestElement, createTestElement)
    testRemoveChild(createTestElement, createTestTextNode)
    testRemoveChild(createTestTextNode, createTestElement)
    testRemoveChild(createTestTextNode, createTestTextNode)
  })

  it(`provides access to the children of its DOM node`, () => {
    const parentNode = document.createElement(`div`)
    const expectedChildren = [
      document.createElement(`a`),
      document.createElement(`p`),
      document.createTextNode(`nested-text`),
      document.createElement(`span`),
    ]

    expectedChildren.forEach(childNode => parentNode.appendChild(childNode))

    const elementProxy = new ElementProxy(parentNode)
    const actualChildren = elementProxy.children()

    assert.equal(actualChildren.length, expectedChildren.length)
    expectedChildren.forEach((expectedChildNode, i) => {
      assert.equal(actualChildren[i], expectedChildNode)
    })
  })
})
