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

describe(`kitchen sink of jsx tests`, () => {
  it(`Adds jsx null/empty elements`, () => {
    function NullChildren () {
      return (
        <div id="layer1">
          <div id="children">
            {null}
            {Observable.from([null])}
            {``}
            {Observable.from([``])}
            {Observable.of(<p>actual child</p>)}
          </div>
        </div>
      )
    }

    const component = h(NullChildren)
    const {node, cleanup} = renderInDocument(component)

    const children = node.querySelector(`#children`)

    assert.equal(children.children.length, 1)
    cleanup()
  })

  it(`removes jsx children after clicking without keys`, () => {
    function DestroyChildren ({createEventHandler}) {
      const handleAdd = createEventHandler(1)
      const handleRemove = createEventHandler(-1)

      const lenToElements = tag => (len: number) => {
        const els = Array(len)
        let i = -1

        while (++i < len) {
          let elem = null
          if (tag === `b`) elem = <b>b element</b>
          else if (tag === `p`) elem = <p>p element</p>

          els[i] = elem
        }

        return els
      }

      const addable = handleAdd.scan((acc, i) => acc + i, 1).startWith(1).map(lenToElements(`b`))
      const removeable = handleRemove.scan((acc, i) => acc + i, 4).startWith(4).map(lenToElements(`p`))

      return (
        <div id="layer1">
          <div id="children">
            {addable}
            {removeable}
          </div>
          <button id="add" onClick={handleAdd}>add</button>
          <button id="remove" onClick={handleRemove}>remove</button>
        </div>
      )
    }

    const component = <DestroyChildren />
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

/* eslint react/prop-types: 0 */
/* eslint react/react-in-jsx-scope: 0 */
