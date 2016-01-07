import document from 'global/document'
import {patchProperties} from '../patchProperties'

describe(`patchProperties`, () => {
  it(`sets attributes on a node`, () => {
    const node = document.createElement(`div`)

    const previous = {
      width: 5,
      mustard: `on the beat`,
    }

    patchProperties(node, previous, {})

    assert.equal(node.width, 5, `node width prop should be set`)
    assert.equal(node.mustard, `on the beat`, `node custom prop should be set`)

    const props = {
      height: 5,
      disabled: true,
      hidden: true,
    }

    patchProperties(node, props, previous)

    assert.equal(node.height, 5, `node height prop should be set`)
    assert.equal(node.width, undefined, `node width prop should not be set`)
    assert.equal(node.disabled, true, `node disabled prop should not be set`)
    assert.equal(node.hidden, true, `node hidden prop should not be set`)
    assert.equal(node.mustard, undefined, `node custom prop should not be set`)

    const next = {
    }

    patchProperties(node, next, props)

    assert.equal(node.height, undefined, `node height prop should be set`)
    assert.equal(node.disabled, false, `node disabled prop should not be set`)
    assert.equal(node.hidden, false, `node disabled prop should not be set`)
  })
})
