import { default as test } from 'tape'
import { h, Rx } from 'yolk' // eslint-disable-line no-unused-vars
import { default as renderInDoc } from '../helpers/renderInDoc'

test(`ChangingProps: when a changed element changes it's list of properties instead of just the values`, t => {
  t.plan(5)

  const child = new Rx.BehaviorSubject(<span key="first">Hello!</span>)
  const [node, cleanup] = renderInDoc(<div>{child}</div>)

  t.equal(node.firstChild.tagName, `SPAN`)
  t.equal(node.firstChild.innerHTML, `Hello!`)

  child.onNext(<span className="stub" key="second">Goodbye</span>)

  t.equal(node.firstChild.tagName, `SPAN`)
  t.equal(node.firstChild.className, `stub`)
  t.equal(node.firstChild.innerHTML, `Goodbye`)

  cleanup()
})
