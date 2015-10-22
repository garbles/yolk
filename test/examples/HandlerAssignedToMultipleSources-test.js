const test = require(`tape`)
const Yolk = require(`yolk`)

test(`assigning a handler to multiple sources`, t => {
  t.plan(7)

  const handler = Yolk.createEventHandler(true, true)
  const className = handler.map(() => `some-class`)

  const component = (
    <div className={className}>
      <button onClick={handler} />
      <button onClick={handler} />
    </div>
  )

  const nextComponent = <div className={className} />
  const lastComponent = <div className={null} />

  const node = document.createElement(`div`)
  document.body.appendChild(node)
  Yolk.render(component, node)

  t.equal(node.innerHTML, `<div class="some-class"><button></button><button></button></div>`)
  t.equal(handler.hasObservers(), true)

  Yolk.render(nextComponent, node)

  t.equal(node.innerHTML, `<div class="some-class"></div>`)
  t.equal(handler.isDisposed, false)
  t.equal(handler.hasObservers(), true)

  Yolk.render(lastComponent, node)

  t.equal(node.innerHTML, `<div></div>`)
  t.equal(handler.hasObservers(), false)
})
