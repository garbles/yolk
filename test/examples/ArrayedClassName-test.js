/** @jsx createElement */

const {createElement, createEventHandler, render} = Yolk

describe('An arrayed list of classes', () => {
  it('converts an array of class names to a string and discards falsy values', () => {
    const component = <div className={[`a`, `b`, `c`, undefined, false, null, `g`]} />
    const node = document.createElement(`div`)
    render(component, node)

    assert.equal(node.innerHTML, `<div class="a b c g"></div>`)
  })
})
