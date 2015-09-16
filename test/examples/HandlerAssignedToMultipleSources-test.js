/** @jsx Yolk.createElement */

const {createEventHandler, render} = Yolk

describe(`assigning a handler to multiple sources`, () => {
  it(`should dispose of the handler only when it is no longer in use`, () => {
    const handler = createEventHandler(true, true)
    const className = handler.map(() => `some-class`)

    const component = (
      <div className={className}>
        <button onClick={handler} />
        <button onClick={handler} />
      </div>
    )

    const nextComponent = <div className={className} />
    const lastComponent = <div />

    const node = document.createElement(`div`)
    render(component, node)

    assert.equal(node.innerHTML, `<div class="some-class"><button></button><button></button></div>`)
    assert.equal(handler.hasObservers(), true)

    render(nextComponent, node)

    assert.equal(node.innerHTML, `<div class="some-class"></div>`)
    assert.equal(handler.isDisposed, false)
    assert.equal(handler.hasObservers(), true)

    render(lastComponent, node)
    assert.equal(node.innerHTML, `<div></div>`)

    assert.equal(handler.hasObservers(), false)
  })
})
