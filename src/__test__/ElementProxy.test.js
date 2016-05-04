/* @flow */

import document from 'global/document'
import sinon from 'sinon/pkg/sinon'
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

  it(`provides proxied querySelector access to its document`, () => {
    const elementNode = document.createElement(`div`)
    elementNode.className = `testClass`
    document.body.appendChild(elementNode)

    try {
      const elementProxy = ElementProxy.querySelector(`.testClass`)
      assert.ok(elementProxy instanceof ElementProxy)
      assert.equal(elementProxy && elementProxy._node, elementNode)

      const nonexistentElementProxy = ElementProxy.querySelector(`.nonexistentClass`)
      assert.equal(nonexistentElementProxy, null)
    } finally {
      elementNode.parentNode.removeChild(elementNode)
    }
  })

  it(`creates a proxy from an existing element`)

  it(`provides facility to emit mount and unmount events`, () => {
    const elementProxy = ElementProxy.createElement(`div`)

    assert.ok(`emitMount` in elementProxy)
    assert.ok(`emitUnmount` in elementProxy)

    // Simply verify that _emitMount and _emitUnmount are called as expected,
    // assuming the implementations are tested elsewhere.
    const expectedNode = elementProxy._node
    const expectedMountCallback = () => {}
    const expectedUnmountCallback = () => {}

    elementProxy._emitMount = sinon.stub()
    elementProxy.emitMount(expectedMountCallback)
    assert.ok(elementProxy._emitMount.calledWith(expectedNode, expectedMountCallback))

    elementProxy._emitUnmount = sinon.stub()
    elementProxy.emitUnmount(expectedUnmountCallback)
    assert.ok(elementProxy._emitUnmount.calledWith(expectedNode, expectedUnmountCallback))
  })

  const createTestElement = () => ElementProxy.createElement(`div`)
  const createTestTextNode = () => TextProxy.createTextNode(`some-text`)

  it(`appends a child`, () => {
    const testAppend = (createTestProxy, createTestProxy2) => {
      const parentProxy = ElementProxy.createElement(`div`)
      const childNodes = parentProxy.childNodes()

      assert.equal(childNodes.length, 0)

      const childProxy = createTestProxy()
      parentProxy.insertChild(childProxy, childNodes.length)

      assert.equal(childNodes.length, 1)
      assert.equal(childNodes[0], childProxy._node)

      const childProxy2 = createTestProxy2()
      parentProxy.insertChild(childProxy2, childNodes.length)

      assert.equal(childNodes.length, 2)
      assert.equal(childNodes[1], childProxy2._node)
    }

    testAppend(createTestElement, createTestElement)
    testAppend(createTestElement, createTestTextNode)
    testAppend(createTestTextNode, createTestElement)
    testAppend(createTestTextNode, createTestTextNode)
  })

  it(`inserts a child before another child`, () => {
    const testInsertBefore = (createBeforeNode, createInsertedNode) => {
      const parentProxy = ElementProxy.createElement(`div`)
      const childNodes = parentProxy.childNodes()

      const beforeNodeProxy = createBeforeNode()
      parentProxy.insertChild(beforeNodeProxy, 0)

      // Confirm assumptions
      assert.equal(childNodes.length, 1)
      assert.equal(childNodes[0], beforeNodeProxy._node)

      const insertedNodeProxy = createInsertedNode()
      parentProxy.insertChild(insertedNodeProxy, 0)

      assert.equal(childNodes.length, 2)
      assert.equal(childNodes[0], insertedNodeProxy._node)
      assert.equal(childNodes[1], beforeNodeProxy._node)
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
      const childNodes = parentProxy.childNodes()

      childProxies.forEach((childProxy, i) => parentProxy.insertChild(childProxy, i))

      // Confirm assumptions
      assert.ok(childProxies.every((childProxy, i) => childProxy._node === childNodes[i]))

      const replacementNode = createReplacementProxy()
      parentProxy.replaceChild(replacementNode, 1)
      const expectedChildProxies = [childProxies[0], replacementNode, childProxies[2]]
      assert.ok(expectedChildProxies.every((expectedProxy, i) => expectedProxy._node === childNodes[i]))
    }

    testReplaceChild(createTestElement, createTestElement)
    testReplaceChild(createTestElement, createTestTextNode)
    testReplaceChild(createTestTextNode, createTestElement)
    testReplaceChild(createTestTextNode, createTestTextNode)
  })

  it(`removes a child`, () => {
    const testRemoveChild = (createTestProxy, createTestProxy2) => {
      const parentProxy = ElementProxy.createElement(`div`)
      const childNodes = parentProxy.childNodes()

      const childProxy = createTestProxy()

      parentProxy.insertChild(childProxy, childNodes.length)
      assert.equal(childNodes.length, 1)
      assert.equal(childNodes[0], childProxy._node)
      parentProxy.removeChild(childProxy)
      assert.equal(childNodes.length, 0)

      const childProxy2 = createTestProxy2()

      parentProxy.insertChild(childProxy, childNodes.length)
      parentProxy.insertChild(childProxy2, childNodes.length)
      assert.equal(childNodes.length, 2)

      parentProxy.removeChild(childProxy)
      assert.equal(childNodes.length, 1)
      assert.equal(childNodes[0], childProxy2._node)

      parentProxy.removeChild(childProxy2)
      assert.equal(childNodes.length, 0)

      parentProxy.insertChild(childProxy, childNodes.length)
      parentProxy.insertChild(childProxy2, childNodes.length)
      assert.equal(childNodes.length, 2)

      parentProxy.removeChild(childProxy2)
      assert.equal(childNodes.length, 1)
      assert.equal(childNodes[0], childProxy._node)

      parentProxy.removeChild(childProxy)
      assert.equal(childNodes.length, 0)
    }

    testRemoveChild(createTestElement, createTestElement)
    testRemoveChild(createTestElement, createTestTextNode)
    testRemoveChild(createTestTextNode, createTestElement)
    testRemoveChild(createTestTextNode, createTestTextNode)
  })

  it(`provides access to the child nodes of its DOM node`, () => {
    const parentNode = document.createElement(`div`)
    const expectedChildNodes = [
      document.createElement(`a`),
      document.createElement(`p`),
      document.createTextNode(`nested-text`),
      document.createElement(`span`),
    ]

    expectedChildNodes.forEach(childNode => parentNode.appendChild(childNode))

    const elementProxy = new ElementProxy(parentNode)
    const actualChildNodes = elementProxy.childNodes()

    assert.equal(actualChildNodes.length, expectedChildNodes.length)
    expectedChildNodes.forEach((expectedChildNode, i) => {
      assert.equal(actualChildNodes[i], expectedChildNode)
    })
  })

  it(`sets, gets, and removes attributes according to descriptors`)
  it(`sets, gets, and removes properties according to descriptors`)
  it(`sets, gets, and removes event listeners according to descriptors`)
})
