const test = require(`tape`)
const Rx = require(`rx`)
const YolkBaseComponent = require(`YolkBaseComponent`)

test(`returns a base component`, t => {
  t.plan(2)

  const instance = new YolkBaseComponent(`p`, {height: 5}, [])
  const node = instance.init()

  t.equal(node.outerHTML, `<p height="5"></p>`)

  const patched = new YolkBaseComponent(`p`, {height: 10}, [`hello`])
  patched.update(instance)

  t.equal(node.outerHTML, `<p height="10">hello</p>`)
})

test(`does not apply new prop keys`, t => {
  t.plan(1)

  const instance = new YolkBaseComponent(`p`, {height: 5}, [])
  const node = instance.init()

  const patched = new YolkBaseComponent(`p`, {width: 10}, [`hello`])
  patched.update(instance)

  t.equal(node.outerHTML, `<p height="null">hello</p>`)
})

test(`listens for mount and umount when defined`, t => {
  t.plan(2)
  t.timeoutAfter(100)

  const instance = new YolkBaseComponent(`p`, {}, [])
  const node = instance.init()

  node.addEventListener(`mount`, () => {
    t.pass(`emits mount event`)
  })

  node.addEventListener(`unmount`, () => {
    t.pass(`emits unmount event`)
  })
  document.body.appendChild(node)

  instance.destroy()
})

test(`accepts observables as props`, t => {
  t.plan(2)

  const height = new Rx.BehaviorSubject(5)

  const instance = new YolkBaseComponent(`p`, {height}, [])
  const node = instance.init()
  document.body.appendChild(node)

  t.equal(node.outerHTML, `<p height="5"></p>`)

  height.onNext(10)

  t.equal(node.outerHTML, `<p height="10"></p>`)
})

test(`does not wrap objects with toJS defined on them`, t => {
  t.plan(1)

  const style = {
    toJS () {
      return {height: 5, width: 10}
    },
  }

  const instance = new YolkBaseComponent(`p`, {style}, [])
  const node = instance.init()
  document.body.appendChild(node)

  t.equal(node.outerHTML, `<p style="height: 5px; width: 10px; "></p>`)
})

test(`properly wraps children with toJS defined on them`, t => {
  t.plan(2)

  const child1 = new YolkBaseComponent(`p`, null, [`hello`])
  const child2 = new Rx.BehaviorSubject(new YolkBaseComponent(`p`, null, [`goodbye`]))

  let children = {
    toJS () {
      return [child1]
    },
  }

  const childrenSubject = new Rx.BehaviorSubject(children)

  const instance = new YolkBaseComponent(`b`, null, [childrenSubject])
  const node = instance.init()
  document.body.appendChild(node)

  t.equal(node.outerHTML, `<b><p>hello</p></b>`)

  children = {
    toJS () {
      return [child1, child2]
    },
  }

  childrenSubject.onNext([children])

  t.equal(node.outerHTML, `<b><p>hello</p><p>goodbye</p></b>`)
})
