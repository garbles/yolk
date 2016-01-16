import $ from 'jquery'
import {h} from '../h'
import {renderInDocument} from './support/renderInDocument'

import 'rxjs/add/operator/merge'
import 'rxjs/add/operator/scan'
import 'rxjs/add/operator/startWith'

// test kitchen sink
describe(`h`, () => {
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
        h(`span`, { className: count }),
      )
    }

    const vnode = h(Counter)
    const {node, cleanup} = renderInDocument(vnode)

    const $node = $(node)
    const $plus = $node.find(`#plus`)
    const $minus = $node.find(`#minus`)

    assert.equal(node.tagName, `div`)
    assert.equal(node.children[0].tagName, `button`)
    assert.equal(node.children[0].id, `plus`)
    assert.equal(node.children[0].textContent, `+ PLUS`)
    assert.equal(node.children[1].tagName, `button`)
    assert.equal(node.children[1].id, `minus`)
    assert.equal(node.children[1].textContent, `- MINUS`)
    assert.equal(node.children[2].tagName, `span`)
    assert.equal(node.children[2].className, `0`)

    $plus.trigger(`click`)
    $plus.trigger(`click`)
    $plus.trigger(`click`)
    $plus.trigger(`click`)
    $minus.trigger(`click`)

    assert.equal(node.children[2].className, `3`)

    cleanup()
  })
})
