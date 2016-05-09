/* @flow weak */

import $ from 'jquery'
import {Observable} from 'rxjs/Observable'
import {renderInDocument} from './support/renderInDocument'
import {h} from '../h'

import 'rxjs/add/observable/interval'
import 'rxjs/add/observable/from'
import 'rxjs/add/observable/of'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/merge'
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/scan'
import 'rxjs/add/operator/startWith'
import 'rxjs/add/operator/combineLatest'

describe(`Issues regression tests`, () => {
  it(`Adds jsx null/empty elements`, () => {
    function NullChildren () {
      return h(`div`, {id: `children`}, [
        null,
        Observable.from([null]),
        ``,
        Observable.from([``]),
        Observable.of(h(`p`, null, `actual child`)),
      ])
    }

    const vnode = h(NullChildren)
    const {node, cleanup} = renderInDocument(vnode)

    assert.equal(node.children.length, 1)
    cleanup()
  })

  it(`Removes simple children with text after clicking without keys: #101`, () => {
    function DestroyChildren ({createEventHandler}) {
      const handleAdd = createEventHandler(1)
      const handleRemove = createEventHandler(-1)

      const lenToElements = tag => (len: number) => {
        const els = Array(len)
        let i = -1

        while (++i < len) {
          let elem = null
          if (tag === `b`) elem = h(`b`, {}, `b element`)
          else if (tag === `p`) elem = h(`p`, {}, `element`)

          els[i] = elem
        }

        return els
      }

      const addable = handleAdd.scan((acc, i) => acc + i, 1).startWith(1).map(lenToElements(`b`))
      const removeable = handleRemove.scan((acc, i) => acc + i, 4).startWith(4).map(lenToElements(`p`))

      return h(`div`, {id: `layer1`},
        Observable.of(``),
        h(`div`, {id: `children`}, [
          addable,
          removeable,
        ]),
        h(`button`, {id: `add`, onClick: handleAdd}),
        h(`button`, {id: `remove`, onClick: handleRemove})
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
