/* @flow */

import {VirtualText} from '../VirtualText'

describe(`VirtualText`, () => {
  it(`creates a virtual text object`, () => {
    const vnode = new VirtualText(`:neckbeard:`)

    assert.equal(vnode.text, `:neckbeard:`)
  })
})
