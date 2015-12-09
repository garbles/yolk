import { default as test } from 'tape'
import { h, Rx } from 'yolk'
import { default as renderInDoc } from '../helpers/renderInDoc'

test(`DisablingButton: you can disable a button`, t => {
  t.plan(2)
  t.timeoutAfter(100)

  const disabled = new Rx.BehaviorSubject(true)

  const instance = <button disabled={disabled} />
  const [node, cleanup] = renderInDoc(instance)

  t.equal(node.disabled, true)

  disabled.onNext(false)

  t.equal(node.disabled, false)

  cleanup()
})
