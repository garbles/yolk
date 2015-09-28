/** @jsx Yolk.createElement */

const test = require(`tape`)
const Rx = require(`rx`)
const Yolk = require(`../../lib/yolk`)

function Stub (props, children) {
  const handleClick = this.createEventHandler(() => 1, 0)
  const count = handleClick.scan((acc, next) => acc + next, 0)

  return <button className="stub" onClick={handleClick}>{children}{count}</button>
}

test(`does not destroy the previous instance of the child`, t => {
  t.plan(5)

  const flipper = new Rx.BehaviorSubject()
  const children = flipper.scan(acc => [acc[1], acc[0]], [<Stub key="second">2</Stub>, <Stub key="first">1</Stub>])
  const component = <div key="wrapper">{children}</div>
  const node = document.createElement(`div`)
  Yolk.render(component, node)

  const stubs = node.querySelectorAll(`.stub`)
  const first = stubs[0]
  const second = stubs[1]

  t.equal(node.innerHTML, `<div><button class="stub">10</button><button class="stub">20</button></div>`)

  first.click()

  t.equal(node.innerHTML, `<div><button class="stub">11</button><button class="stub">20</button></div>`)

  flipper.onNext(true)

  t.equal(node.innerHTML, `<div><button class="stub">20</button><button class="stub">11</button></div>`)

  first.click()
  first.click()
  first.click()
  second.click()
  second.click()
  flipper.onNext(true)

  t.equal(node.innerHTML, `<div><button class="stub">14</button><button class="stub">22</button></div>`)

  flipper.onNext(true)

  t.equal(node.innerHTML, `<div><button class="stub">22</button><button class="stub">14</button></div>`)
})

test(`does not reset children as long as one of them is keyed`, t => {
  t.plan(3)

  const flipper = new Rx.BehaviorSubject()
  const children = flipper.scan(acc => [acc[1], acc[2], acc[3], acc[0]], [<Stub>4</Stub>, <Stub key="first">1</Stub>, <Stub>2</Stub>, <Stub>3</Stub>])
  const component = <div key="wrapper">{children}</div>
  const node = document.createElement(`div`)
  Yolk.render(component, node)

  const stubs = node.querySelectorAll(`.stub`)
  const first = stubs[0]
  const second = stubs[1]
  const third = stubs[2]
  const fourth = stubs[3]

  t.equal(node.innerHTML, `<div><button class="stub">10</button><button class="stub">20</button><button class="stub">30</button><button class="stub">40</button></div>`)

  first.click()
  second.click()
  third.click()
  fourth.click()

  t.equal(node.innerHTML, `<div><button class="stub">11</button><button class="stub">21</button><button class="stub">31</button><button class="stub">41</button></div>`)

  flipper.onNext(true)

  t.equal(node.innerHTML, `<div><button class="stub">21</button><button class="stub">31</button><button class="stub">41</button><button class="stub">11</button></div>`)
})

test(`resets children if they aren't keyed`, t => {
  t.plan(3)

  const flipper = new Rx.BehaviorSubject()
  const children = flipper.scan(acc => [acc[1], acc[0]], [<Stub>2</Stub>, <Stub>1</Stub>])
  const component = <div key="wrapper">{children}</div>
  const node = document.createElement(`div`)
  Yolk.render(component, node)

  const stubs = node.querySelectorAll(`.stub`)
  const first = stubs[0]
  const second = stubs[1]

  t.equal(node.innerHTML, `<div><button class="stub">10</button><button class="stub">20</button></div>`)

  first.click()
  second.click()

  t.equal(node.innerHTML, `<div><button class="stub">11</button><button class="stub">21</button></div>`)

  flipper.onNext(true)

  t.equal(node.innerHTML, `<div><button class="stub">11</button><button class="stub">21</button></div>`)
})
