import { default as test } from 'tape'
import { default as Rx } from 'rx'
import { default as YolkBaseComponent } from 'YolkBaseComponent'
import { default as renderInDoc } from '../helpers/renderInDoc'

test(`YolkBaseComponent: returns a base component`, t => {
  t.plan(6)
  t.timeoutAfter(100)

  const instance = new YolkBaseComponent(`p`, {height: 5}, [])
  const [node, cleanup] = renderInDoc(instance)

  t.equal(node.tagName, `P`)
  t.equal(node.getAttribute(`height`), `5`)
  t.notOk(node.innerHTML, ``)

  const patched = new YolkBaseComponent(`p`, {height: 10}, [`hello`])
  patched.update(instance)

  t.equal(node.tagName, `P`)
  t.equal(node.getAttribute(`height`), `10`)
  t.equal(node.innerHTML, `hello`)

  cleanup()
})

test(`YolkBaseComponent: does not apply new prop keys`, t => {
  t.plan(3)
  t.timeoutAfter(100)

  const instance = new YolkBaseComponent(`p`, {height: 5}, [])
  const [node, cleanup] = renderInDoc(instance)

  const patched = new YolkBaseComponent(`p`, {width: 10}, [`hello`])
  patched.update(instance)

  t.equal(node.tagName, `P`)
  t.equal(node.getAttribute(`height`), `null`)
  t.notOk(node.getAttribute(`width`))

  cleanup()
})

test(`YolkBaseComponent: listens for mount and umount when defined`, t => {
  t.plan(2)
  t.timeoutAfter(2000)

  const handler = () => t.pass(`emits event`)
  const instance = new YolkBaseComponent(`p`, {onMount: handler, onUnmount: handler}, [])
  const [node, cleanup] = renderInDoc(instance)

  setTimeout(() => {
    instance.predestroy(node)
    cleanup()
  }, 0)
})

test(`YolkBaseComponent: accepts observables as props`, t => {
  t.plan(3)
  t.timeoutAfter(100)

  const height = new Rx.BehaviorSubject(5)

  const instance = new YolkBaseComponent(`p`, {height}, [])
  const [node, cleanup] = renderInDoc(instance)

  t.equal(node.tagName, `P`)
  t.equal(node.getAttribute(`height`), `5`)

  height.onNext(10)

  t.equal(node.getAttribute(`height`), `10`)

  cleanup()
})

test(`YolkBaseComponent: does not wrap objects with toJS defined on them`, t => {
  t.plan(2)
  t.timeoutAfter(100)

  const style = {
    toJS () {
      return {height: 5, width: 10}
    },
  }

  const instance = new YolkBaseComponent(`p`, {style}, [])
  const [node, cleanup] = renderInDoc(instance)

  t.equal(node.style.height, `5px`)
  t.equal(node.style.width, `10px`)

  cleanup()
})

test(`YolkBaseComponent: properly wraps children with toJS defined on them`, t => {
  t.plan(8)
  t.timeoutAfter(100)

  const child1 = new YolkBaseComponent(`p`, null, [`hello`])
  const child2 = new Rx.BehaviorSubject(new YolkBaseComponent(`p`, null, [`goodbye`]))

  let children = {
    toJS () {
      return [child1]
    },
  }

  const childrenSubject = new Rx.BehaviorSubject(children)

  const instance = new YolkBaseComponent(`b`, null, [childrenSubject])
  const [node, cleanup] = renderInDoc(instance)

  t.equal(node.tagName, `B`)
  t.equal(node.firstChild.tagName, `P`)
  t.equal(node.firstChild.innerHTML, `hello`)

  children = {
    toJS () {
      return [child1, child2]
    },
  }

  childrenSubject.onNext([children])

  t.equal(node.tagName, `B`)
  t.equal(node.children[0].tagName, `P`)
  t.equal(node.children[0].innerHTML, `hello`)
  t.equal(node.children[1].tagName, `P`)
  t.equal(node.children[1].innerHTML, `goodbye`)

  cleanup()
})
