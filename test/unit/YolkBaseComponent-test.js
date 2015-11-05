const test = require(`tape`)
const Rx = require(`rx`)
const YolkBaseComponent = require(`YolkBaseComponent`)
const renderInDoc = require(`../helpers/renderInDoc`)

test(`YolkBaseComponent: returns a base component`, t => {
  t.plan(2)

  const instance = new YolkBaseComponent(`p`, {height: 5}, [])
  const node = instance.init()

  t.equal(node.outerHTML, `<p height="5"></p>`)

  const patched = new YolkBaseComponent(`p`, {height: 10}, [`hello`])
  patched.update(instance)

  t.equal(node.outerHTML, `<p height="10">hello</p>`)
})

test(`YolkBaseComponent: does not apply new prop keys`, t => {
  t.plan(1)

  const instance = new YolkBaseComponent(`p`, {height: 5}, [])
  const node = instance.init()

  const patched = new YolkBaseComponent(`p`, {width: 10}, [`hello`])
  patched.update(instance)

  t.equal(node.outerHTML, `<p height="null">hello</p>`)
})

test(`YolkBaseComponent: listens for mount and umount when defined`, t => {
  t.plan(2)
  t.timeoutAfter(100)

  const instance = new YolkBaseComponent(`p`, {onMount: () => {}, onUnmount: () => {}}, [])
  const [node, cleanup] = renderInDoc(instance)
  const child = node.firstChild

  const handler = () => t.pass(`emits event`)

  child.addEventListener(`mount`, handler)
  child.addEventListener(`unmount`, handler)

  setTimeout(() => {
    instance.predestroy()
    child.removeEventListener(`mount`, handler)
    child.removeEventListener(`unmount`, handler)
    cleanup()
  }, 0)
})

test(`YolkBaseComponent: accepts observables as props`, t => {
  t.plan(2)

  const height = new Rx.BehaviorSubject(5)

  const instance = new YolkBaseComponent(`p`, {height}, [])
  const [node, cleanup] = renderInDoc(instance)

  t.equal(node.innerHTML, `<p height="5"></p>`)

  height.onNext(10)

  t.equal(node.innerHTML, `<p height="10"></p>`)

  cleanup()
})

test(`YolkBaseComponent: does not wrap objects with toJS defined on them`, t => {
  t.plan(1)
  t.timeoutAfter(100)

  const style = {
    toJS () {
      return {height: 5, width: 10}
    },
  }

  const instance = new YolkBaseComponent(`p`, {style}, [])
  const [node, cleanup] = renderInDoc(instance)

  t.equal(node.innerHTML, `<p style="height: 5px; width: 10px; "></p>`)

  cleanup()
})

test(`YolkBaseComponent: properly wraps children with toJS defined on them`, t => {
  t.plan(2)
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

  t.equal(node.innerHTML, `<b><p>hello</p></b>`)

  children = {
    toJS () {
      return [child1, child2]
    },
  }

  childrenSubject.onNext([children])

  t.equal(node.innerHTML, `<b><p>hello</p><p>goodbye</p></b>`)

  cleanup()
})
