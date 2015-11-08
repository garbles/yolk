const test = require(`tape`)
const Yolk = require(`yolk`)
const renderInDoc = require(`../helpers/renderInDoc`)

test(`DisablingButton: you can disable a button`, t => {
  t.plan(2)
  t.timeoutAfter(100)

  const disabled = new Yolk.Rx.BehaviorSubject(true)

  const instance = <button disabled={disabled} />
  const [node, cleanup] = renderInDoc(instance)

  t.equal(node.disabled, true)

  disabled.onNext(false)

  setTimeout(function () {
    t.equal(node.disabled, false)

    cleanup()
  
  })
})
