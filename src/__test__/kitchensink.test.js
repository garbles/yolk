/* @flow weak */

import $ from 'jquery'
import {Observable} from 'rxjs/Observable'
import {BehaviorSubject} from 'rxjs/subject/BehaviorSubject'
import {h} from '../h'
import {noop} from '../noop'
import {render} from '../render'
import {renderInDocument} from './support/renderInDocument'

import 'rxjs/add/observable/interval'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/merge'
import 'rxjs/add/operator/scan'
import 'rxjs/add/operator/startWith'
import 'rxjs/add/operator/combineLatest'

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
        h(`span#count`, {}, count)
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
    let mountCallbackCount: number = 0
    let unmountCallbackCount: number = 0
    const onMount = () => {mountCallbackCount += 1}
    const onUnmount = () => {unmountCallbackCount += 1}
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

    const someChild = () => h(`div`, {onMount}, [new BehaviorSubject(h(`strong`, {onMount}))])

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

  it(`removes children after clicking with keys`, () => {
    function DestroyChildren ({createEventHandler}) {
      const handleAdd = createEventHandler(null, 0)
      const handleRemove = createEventHandler(null, 0)

      const addable = handleAdd.scan(acc => acc.concat([h(`b`)]), [])
      const removeable = handleRemove.scan(acc => acc.slice(1),
        [
          h(`p`, {id: `1`, key: `11`}),
          h(`p`, {id: `2`, key: `22`}),
          h(`p`, {id: `3`, key: `33`}),
          h(`p`, {id: `4`, key: `44`}),
          h(`p`, {id: `5`, key: `55`}),
        ]
      )

      return (
        h(`div`, {}, [
          h(`div`, {id: `children`}, [
            addable,
            removeable,
          ]),
          h(`button#add`, {onClick: handleAdd}),
          h(`button#remove`, {onClick: handleRemove}),
        ])
      )
    }

    const component = h(DestroyChildren)
    const {node, cleanup} = renderInDocument(component)

    const adder = $(`#add`)
    const remover = $(`#remove`)
    const children = node.querySelector(`#children`)

    assert.equal(children.children.length, 5)
    assert.equal(children.children[0].tagName, `B`)
    assert.equal(children.children[1].tagName, `P`)
    assert.equal(children.children[2].tagName, `P`)
    assert.equal(children.children[3].tagName, `P`)
    assert.equal(children.children[4].tagName, `P`)
    assert.equal(children.children[1].id, `2`)
    assert.equal(children.children[2].id, `3`)
    assert.equal(children.children[3].id, `4`)
    assert.equal(children.children[4].id, `5`)

    remover.trigger(`click`)

    assert.equal(children.children.length, 4)
    assert.equal(children.children[0].tagName, `B`)
    assert.equal(children.children[1].tagName, `P`)
    assert.equal(children.children[2].tagName, `P`)
    assert.equal(children.children[3].tagName, `P`)
    assert.equal(children.children[1].id, `3`)
    assert.equal(children.children[2].id, `4`)
    assert.equal(children.children[3].id, `5`)

    remover.trigger(`click`)
    remover.trigger(`click`)

    assert.equal(children.children.length, 2)
    assert.equal(children.children[0].tagName, `B`)
    assert.equal(children.children[1].tagName, `P`)
    assert.equal(children.children[1].id, `5`)

    adder.trigger(`click`)
    adder.trigger(`click`)

    assert.equal(children.children.length, 4)
    assert.equal(children.children[0].tagName, `B`)
    assert.equal(children.children[1].tagName, `B`)
    assert.equal(children.children[2].tagName, `B`)
    assert.equal(children.children[3].tagName, `P`)

    cleanup()
  })

  it(`removes children after clicking without keys`, () => {
    function DestroyChildren ({createEventHandler}) {
      const handleAdd = createEventHandler(1)
      const handleRemove = createEventHandler(-1)

      const lenToElements = tag => (len: number) => {
        const els = Array(len)
        let i = -1


        while (++i < len) {
          els[i] = h(tag)
        }

        return els
      }

      const addable = handleAdd.scan((acc, i) => acc + i, 1).startWith(1).map(lenToElements(`b`))
      const removeable = handleRemove.scan((acc, i) => acc + i, 4).startWith(4).map(lenToElements(`p`))

      return (
        h(`div`, {}, [
          h(`div`, {id: `children`}, [
            addable,
            removeable,
          ]),
          h(`button#add`, {onClick: handleAdd}),
          h(`button#remove`, {onClick: handleRemove}),
        ])
      )
    }

    const component = h(DestroyChildren)
    const {node, cleanup} = renderInDocument(component)

    const adder = $(`#add`)
    const remover = $(`#remove`)
    const children = node.querySelector(`#children`)

    assert.equal(children.children.length, 5)
    assert.equal(children.children[0].tagName, `B`)
    assert.equal(children.children[1].tagName, `P`)
    assert.equal(children.children[2].tagName, `P`)
    assert.equal(children.children[3].tagName, `P`)
    assert.equal(children.children[4].tagName, `P`)

    remover.trigger(`click`)

    assert.equal(children.children.length, 4)
    assert.equal(children.children[0].tagName, `B`)
    assert.equal(children.children[1].tagName, `P`)
    assert.equal(children.children[2].tagName, `P`)
    assert.equal(children.children[3].tagName, `P`)

    remover.trigger(`click`)
    remover.trigger(`click`)

    assert.equal(children.children.length, 2)
    assert.equal(children.children[0].tagName, `B`)
    assert.equal(children.children[1].tagName, `P`)

    adder.trigger(`click`)
    adder.trigger(`click`)

    assert.equal(children.children.length, 4)
    assert.equal(children.children[0].tagName, `B`)
    assert.equal(children.children[1].tagName, `B`)
    assert.equal(children.children[2].tagName, `B`)
    assert.equal(children.children[3].tagName, `P`)

    cleanup()
  })

  it(`toggles the disabled prop`, () => {
    const disabled = new BehaviorSubject(true)

    const instance = h(`button`, {disabled})
    const {node, cleanup} = renderInDocument(instance)

    assert.equal(node.disabled, true)

    disabled.next(false)

    assert.equal(node.disabled, false)

    cleanup()
  })

  it(`disposes of event handlers when removed as a child`, done => {
    let onClick = {}
    let onBlur = {}

    function DisposeEventHandlers ({createEventHandler}) {
      onClick = createEventHandler()
      onBlur = createEventHandler()

      onClick.subscribe(noop)
      onClick.subscribe(noop)
      onBlur.subscribe(noop)

      return h(`div`, {onClick, onBlur})
    }

    function Parent () {
      const child = Observable.interval(50).startWith(-1)
        .map(i => {
          if (i === -1) {
            return h(DisposeEventHandlers)
          }

          return h(`div`) // same element
        })

      return h(`p`, {}, child)
    }

    const {cleanup} = renderInDocument(h(Parent))

    assert.equal(onClick.destination.observers.length, 1)
    assert.equal(onBlur.destination.observers.length, 1)
    assert.equal(onClick.hasCompleted, false)
    assert.equal(onBlur.hasCompleted, false)

    setTimeout(() => {
      assert.equal(onClick.destination.observers, null)
      assert.equal(onBlur.destination.observers, null)
      assert.equal(onClick.hasCompleted, true)
      assert.equal(onBlur.hasCompleted, true)

      cleanup()
      done()
    }, 100)
  })

  it(`disposes of event handlers on new render`, () => {
    let onClick = {}
    let onBlur = {}

    function DisposeEventHandlers ({createEventHandler}) {
      onClick = createEventHandler()
      onBlur = createEventHandler()

      onClick.subscribe(noop)
      onClick.subscribe(noop)
      onBlur.subscribe(noop)

      return h(`div`, {onClick, onBlur})
    }

    const {node, cleanup} = renderInDocument(h(DisposeEventHandlers))

    assert.equal(onClick.destination.observers.length, 1)
    assert.equal(onBlur.destination.observers.length, 1)
    assert.equal(onClick.hasCompleted, false)
    assert.equal(onBlur.hasCompleted, false)

    render(h(`p`), node.parentNode)

    assert.equal(onClick.destination.observers, null)
    assert.equal(onBlur.destination.observers, null)
    assert.equal(onClick.hasCompleted, true)
    assert.equal(onBlur.hasCompleted, true)

    cleanup()
  })

  it(`renders children`, () => {
    const HasChildren = ({children}) => h(`div`, {className: `wrapper`}, children)

    const vnode =
      h(HasChildren, {},
        h(HasChildren, {},
          h(HasChildren, {},
            h(HasChildren, {},
              h(`span`, {className: `child`})
            )
          )
        )
      )

    const {node, cleanup} = renderInDocument(vnode)

    assert.equal(node.className, `wrapper`)
    assert.equal(node.firstChild.className, `wrapper`)
    assert.equal(node.firstChild.firstChild.className, `wrapper`)
    assert.equal(node.firstChild.firstChild.firstChild.className, `wrapper`)
    assert.equal(node.firstChild.firstChild.firstChild.firstChild.className, `child`)

    cleanup()
  })

  it(`can create event handlers with multiple subscribers`, () => {
    function Counter ({props, createEventHandler}) {
      const handlePlus = createEventHandler(1)
      const handleMinus = createEventHandler(-1)
      const count = handlePlus.merge(handleMinus).scan((x, y) => x + y, 0).startWith(0)

      return (
        h(`div`, {},
          h(`button#add`, {onClick: handlePlus}),
          h(`button#subtract`, {onClick: handleMinus}),
          h(`div#count1`, {}, count),
          h(`div#count2`, {}, count),
          h(`div#count3`, {}, props.count),
          h(`div#count4`, {}, props.count),
          h(`div#count5`, {}, props.count.combineLatest(count, (a, b) => a + b)),
        )
      )
    }

    const _count = new BehaviorSubject(5)
    const {cleanup} = renderInDocument(h(Counter, {count: _count}))

    const add = () => $(`#add`).trigger(`click`)
    const subtract = () => $(`#subtract`).trigger(`click`)

    const count1 = () => $(`#count1`).text()
    const count2 = () => $(`#count2`).text()
    const count3 = () => $(`#count3`).text()
    const count4 = () => $(`#count4`).text()
    const count5 = () => $(`#count5`).text()

    assert.equal(count1(), 0)
    assert.equal(count2(), 0)
    assert.equal(count3(), 5)
    assert.equal(count4(), 5)
    assert.equal(count5(), 5)

    add()
    subtract()
    add()
    add()
    _count.next(12)

    assert.equal(count1(), 2)
    assert.equal(count2(), 2)
    assert.equal(count3(), 12)
    assert.equal(count4(), 12)
    assert.equal(count5(), 14)

    cleanup()
  })

  it(`allows you to nest callbacks into children`, () => {
    function NestedCallbackChild ({props}) {
      return h(`button#nested`, {onClick: props.onClick})
    }

    function NestedCallback ({createEventHandler}) {
      const handleInc = createEventHandler(() => 1, 0)
      const count = handleInc.scan((x, y) => x + y, 0)

      return (
        h(`div`, {},
          h(`div#count`, {}, count),
          h(NestedCallbackChild, {onClick: handleInc})
        )
      )
    }

    const {cleanup} = renderInDocument(h(NestedCallback))

    const click = () => $(`#nested`).trigger(`click`)
    const count = () => $(`#count`).text()

    assert.equal(count(), 0)

    click()
    click()
    click()

    assert.equal(count(), 3)

    cleanup()
  })

  it(`renders varying number of child components`, () => {
    function Stub ({props, children, createEventHandler}) {
      const handleClick = createEventHandler(() => 1, 0)
      const count = handleClick.scan((acc, next) => acc + next, 0)
      const id$ = props.num.map(n => `stub-${n}`)

      return h(`button`, {id: id$, onClick: handleClick}, [children, count])
    }

    function VaryingWidgetChildrenFromProps ({props}) {
      const numbers = props.numbers.map(nums => nums.map(num => h(Stub, {num}, num)))

      return h(`div`, {}, numbers)
    }

    const numbers = new BehaviorSubject([1, 2, 3])

    const {node, cleanup} = renderInDocument(h(VaryingWidgetChildrenFromProps, {numbers}))

    $(`#stub-1`).trigger(`click`).trigger(`click`)
    $(`#stub-2`).trigger(`click`).trigger(`click`)

    assert.equal(node.children.length, 3)
    assert.equal($(`#stub-1`).text(), `12`)
    assert.equal($(`#stub-2`).text(), `22`)
    assert.equal($(`#stub-3`).text(), `30`)

    cleanup()
  })
})
