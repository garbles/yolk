import $ from 'jquery'
import {Observable} from 'rxjs/Observable'
import {BehaviorSubject} from 'rxjs/subject/BehaviorSubject'
import {h} from '../h'
import {renderInDocument} from './support/renderInDocument'

import 'rxjs/add/operator/merge'
import 'rxjs/add/operator/scan'
import 'rxjs/add/operator/startWith'

describe(`kitchen sink of tests`, () => {
  it(`creates a simple clicker`, () => {
    function Counter ({createEventHandler}) {
      const handlePlus = createEventHandler(1)
      const handleMinus = createEventHandler(-1)
      const count = handlePlus
                    .merge(handleMinus)
                    .scan((x, y) => x + y)
                    .startWith(0)

      return h(`div`, {},
        h(`button#plus`, {onClick: handlePlus}, `+ `, `PLUS`),
        h(`button#minus`, {onClick: handleMinus}, `- `, `MINUS`),
        h(`span`, {}, count),
      )
    }

    const vnode = h(Counter)
    const {node, cleanup} = renderInDocument(vnode)

    const $node = $(node)
    const $plus = $node.find(`#plus`)
    const $minus = $node.find(`#minus`)

    assert.equal(node.tagName, `DIV`)
    assert.equal(node.children[0].tagName, `BUTTON`)
    assert.equal(node.children[0].id, `plus`)
    assert.equal(node.children[0].textContent, `+ PLUS`)
    assert.equal(node.children[1].tagName, `BUTTON`)
    assert.equal(node.children[1].id, `minus`)
    assert.equal(node.children[1].textContent, `- MINUS`)
    assert.equal(node.children[2].tagName, `SPAN`)
    assert.equal(node.children[2].textContent, `0`)

    $plus.trigger(`click`)
    $plus.trigger(`click`)
    $plus.trigger(`click`)
    $plus.trigger(`click`)
    $minus.trigger(`click`)

    assert.equal(node.children[2].textContent, `3`)

    cleanup()
  })

  it(`renders a virtual node into a container`, () => {
    let mountCallbackCount = 0
    let unmountCallbackCount = 0
    const onMount = () => mountCallbackCount += 1
    const onUnmount = () => unmountCallbackCount += 1
    const width = new BehaviorSubject(55)
    const height = new BehaviorSubject(100)

    const children = new BehaviorSubject([h(`strong`, {onUnmount}), h(`p`, {onUnmount})])

    const vnode = h(`div`, {className: `cool`, onMount}, [
      h(`span`, {width, onMount}),
      h(`div`, {height}, [children]),
    ])

    const {node, cleanup} = renderInDocument(vnode)

    assert.equal(node.tagName, `DIV`)
    assert.equal(node.className, `cool`)
    assert.equal(node.children.length, 2)
    assert.equal(node.children[0].tagName, `SPAN`)
    assert.equal(node.children[0].width, 55)
    assert.equal(node.children[1].tagName, `DIV`)
    assert.equal(node.children[1].height, 100)
    assert.equal(node.children[1].children.length, 2)
    assert.equal(node.children[1].children[0].tagName, `STRONG`)
    assert.equal(node.children[1].children[1].tagName, `P`)

    width.next(550)
    height.next(1000)

    const someChild = () => {
      return (
        h(`div`, {onMount}, [new BehaviorSubject(h(`strong`, {onMount}))])
      )
    }

    children.next([h(`p`), h(someChild)])

    assert.equal(node.children[0].width, 550)
    assert.equal(node.children[1].height, 1000)
    assert.equal(node.children[1].tagName, `DIV`)
    assert.equal(node.children[1].children.length, 2)
    assert.equal(node.children[1].children[0].tagName, `P`)
    assert.equal(node.children[1].children[1].tagName, `DIV`)
    assert.equal(node.children[1].children[1].children.length, 1)
    assert.equal(node.children[1].children[1].children[0].tagName, `STRONG`)

    assert.equal(mountCallbackCount, 4)
    assert.equal(unmountCallbackCount, 1)

    cleanup()
  })
})
