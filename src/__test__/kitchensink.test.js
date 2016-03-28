import $ from 'jquery'
import {Observable} from 'rxjs/Observable'
import {BehaviorSubject} from 'rxjs/subject/BehaviorSubject'
import {h} from 'yolk/h'
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
    assert.equal(unmountCallbackCount, 2)

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
          h(`p`, {id: `5`, key: `55`})
        ]
      )

      return (
        h(`div`, {}, [
          h(`div`, {id: `children`}, [
            addable,
            removeable
          ]),
          h(`button#add`, {onClick: handleAdd}),
          h(`button#remove`, {onClick: handleRemove})
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

      const lenToElements = tag => len => {
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
            removeable
          ]),
          h(`button#add`, {onClick: handleAdd}),
          h(`button#remove`, {onClick: handleRemove})
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
})
