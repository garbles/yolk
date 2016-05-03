/* @flow weak */

import sinon from 'sinon/pkg/sinon'
import {VirtualNode} from '../types'
import {createPatchChildren} from '../createPatchChildren'
import {h} from '../h'

function createEmptyVNodes (tag, mapping) {
  return mapping.map(key => h(tag || `p`, {key}))
}

describe(`createPatchChildren`, () => {
  let decorator
  let orderedDecorator

  beforeEach(() => {
    const order = []

    const orderedStub = name => (...args) => {
      order.push([name, ...args])
    }

    orderedDecorator = {
      order,
      insertChild: orderedStub(`insert`),
      updateChild: orderedStub(`update`),
      moveChild: orderedStub(`move`),
      removeChild: orderedStub(`remove`),
    }

    decorator = {
      insertChild: sinon.stub(),
      updateChild: sinon.stub(),
      moveChild: sinon.stub(),
      removeChild: sinon.stub(),
    }
  })

  it(`creates children`, () => {
    const children: Array<VirtualNode> = createEmptyVNodes(`p`, [null, null])
    const patchChildren = createPatchChildren(decorator)

    patchChildren(children, [])

    assert.ok(decorator.insertChild.calledTwice)
    assert.ok(decorator.updateChild.notCalled)
    assert.ok(decorator.moveChild.notCalled)
    assert.ok(decorator.removeChild.notCalled)

    assert.ok(decorator.insertChild.calledWith(children[0], 0))
    assert.ok(decorator.insertChild.calledWith(children[1], 1))
  })

  it(`destroys children`, () => {
    const children: Array<VirtualNode> = createEmptyVNodes(`p`, [null, null])
    const patchChildren = createPatchChildren(decorator)

    patchChildren(children, [])

    assert.ok(decorator.insertChild.calledTwice)
    assert.ok(decorator.updateChild.notCalled)
    assert.ok(decorator.moveChild.notCalled)
    assert.ok(decorator.removeChild.notCalled)

    assert.ok(decorator.insertChild.calledWith(children[0], 0))
    assert.ok(decorator.insertChild.calledWith(children[1], 1))

    patchChildren([], children)

    assert.ok(decorator.insertChild.calledTwice)
    assert.ok(decorator.updateChild.notCalled)
    assert.ok(decorator.moveChild.notCalled)
    assert.ok(decorator.removeChild.calledTwice)

    assert.ok(decorator.removeChild.calledWith(children[0]))
    assert.ok(decorator.removeChild.calledWith(children[1]))
  })

  it(`patches children`, () => {
    const children: Array<VirtualNode> = [h(`p`)]
    const next: Array<VirtualNode> = [h(`p`, {id: `next`})]
    const doubleNext: Array<VirtualNode> = [h(`p`, {id: `double-next`})]

    const patchChildren = createPatchChildren(decorator)

    patchChildren(children)

    assert.ok(decorator.insertChild.calledOnce)
    assert.ok(decorator.moveChild.notCalled)
    assert.ok(decorator.removeChild.notCalled)

    assert.ok(decorator.insertChild.calledWith(children[0], 0))

    patchChildren(next)

    assert.ok(decorator.insertChild.calledOnce)
    assert.ok(decorator.updateChild.calledOnce)
    assert.ok(decorator.moveChild.notCalled)
    assert.ok(decorator.removeChild.notCalled)

    assert.ok(decorator.updateChild.calledWith(children[0], next[0], 0))

    patchChildren(doubleNext)

    assert.ok(decorator.insertChild.calledOnce)
    assert.ok(decorator.updateChild.calledTwice)
    assert.ok(decorator.moveChild.notCalled)
    assert.ok(decorator.removeChild.notCalled)

    assert.ok(decorator.updateChild.calledWith(next[0], doubleNext[0], 0))
  })

  it(`rearranges children with keys`, () => {
    const children: Array<VirtualNode> = createEmptyVNodes(`p`, [`a`, null, null, `b`])
    const next: Array<VirtualNode> = createEmptyVNodes(`p`, [null, `b`, `a`, null])
    const patchChildren = createPatchChildren(orderedDecorator)

    patchChildren(children)

    orderedDecorator.order.map((op, index) => assert.deepEqual(op, [`insert`, children[index], index]))

    patchChildren(next)

    assert.deepEqual(orderedDecorator.order[4], [`move`, children[1], next[0], 0])
    assert.deepEqual(orderedDecorator.order[5], [`move`, children[3], next[1], 1])
    assert.deepEqual(orderedDecorator.order[6], [`move`, children[2], next[3], 2])
    assert.deepEqual(orderedDecorator.order[7], [`move`, children[0], next[2], 2])
  })

  it(`removes children if their key does not match the same tagName`, () => {
    const children: Array<VirtualNode> = createEmptyVNodes(`p`, [null, null])
    const next: Array<VirtualNode> = createEmptyVNodes(`div`, [null, null])

    const patchChildren = createPatchChildren(orderedDecorator)

    patchChildren(children)

    orderedDecorator.order.map((op, index) => assert.deepEqual(op, [`insert`, children[index], index]))

    patchChildren(next)

    assert.deepEqual(orderedDecorator.order[2], [`insert`, next[0], 0])
    assert.deepEqual(orderedDecorator.order[3], [`insert`, next[1], 1])
    assert.deepEqual(orderedDecorator.order[4], [`remove`, children[0]])
    assert.deepEqual(orderedDecorator.order[5], [`remove`, children[1]])
  })
})
