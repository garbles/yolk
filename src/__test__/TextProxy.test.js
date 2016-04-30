/* @flow */

import {TextProxy} from '../TextProxy'

describe(`TextProxy`, () => {
  it(`creates a text node`, () => {
    const expectedText = `expected-text`
    const textProxy = TextProxy.createTextNode(expectedText)

    const node = textProxy._node
    assert.equal(node.nodeType, Node.TEXT_NODE)
    assert.equal(node.nodeValue, expectedText)
  })

  it(`can set its node's text`, () => {
    const textProxy = TextProxy.createTextNode(`initial-text`)

    const expectedText = `expected-text`
    textProxy.setValue(expectedText)
    assert.equal(textProxy._node.nodeValue, expectedText)
  })
})
