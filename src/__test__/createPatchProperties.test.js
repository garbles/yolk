/* @flow weak */

import {createPatchProperties} from '../createPatchProperties'
import {ElementProxy} from '../ElementProxy'
import {get} from '../get'

describe(`patchProperties`, () => {
  it(`sets attributes on a node`, () => {
    const proxy = ElementProxy.createElement(`div`)
    const patchProperties = createPatchProperties(proxy)
    const node = proxy._node

    const previous = {
      width: 5,
      mustard: `on the beat`,
    }

    patchProperties(previous)

    assert.equal(get(node, `width`), 5, `node width prop should be set`)
    assert.equal(node.getAttribute(`mustard`), `on the beat`, `node custom prop should be set`)

    const props = {
      height: 5,
      disabled: true,
      hidden: true,
    }

    patchProperties(props)

    assert.equal(get(node, `height`), 5, `node height prop should be set`)
    assert.equal(get(node, `width`), undefined, `node width prop should not be set`)
    assert.equal(get(node, `disabled`), true, `node disabled prop should not be set`)
    assert.equal(get(node, `hidden`), true, `node hidden prop should not be set`)
    assert.equal(node.getAttribute(`mustard`), undefined, `node custom prop should not be set`)

    const next = {
    }

    patchProperties(next, props)

    assert.equal(get(node, `height`), undefined, `node height prop should be set`)
    assert.equal(get(node, `disabled`), false, `node disabled prop should not be set`)
    assert.equal(get(node, `hidden`), false, `node disabled prop should not be set`)
  })
})
