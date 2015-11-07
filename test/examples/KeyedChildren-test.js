const test = require(`tape`)
const Yolk = require(`yolk`)
const {Rx} = Yolk
const renderInDoc = require(`../helpers/renderInDoc`)

function Stub (props, children) {
  const handleClick = this.createEventHandler(() => 1, 0)
  const count = handleClick.scan((acc, next) => acc + next, 0)

  return <button className="stub" onClick={handleClick}>{children}{count}</button>
}

test(`KeyedChildren: does not destroy the previous instance of the child`, t => {
  t.plan(15)

  const flipper = new Rx.BehaviorSubject()
  const children = flipper.scan(acc => [acc[1], acc[0]], [<Stub key="second">2</Stub>, <Stub key="first">1</Stub>])
  const [node, cleanup] = renderInDoc(<div key="wrapper">{children}</div>)

  const stubs = node.querySelectorAll(`.stub`)
  const first = stubs[0]
  const second = stubs[1]

  t.equal(node.tagName, `DIV`)
  t.equal(node.children[0].tagName, `BUTTON`)
  t.equal(node.children[0].className, `stub`)
  t.equal(node.children[0].innerHTML, `10`)
  t.equal(node.children[1].tagName, `BUTTON`)
  t.equal(node.children[1].className, `stub`)
  t.equal(node.children[1].innerHTML, `20`)

  first.click()

  t.equal(node.children[0].innerHTML, `11`)
  t.equal(node.children[1].innerHTML, `20`)

  flipper.onNext(true)

  t.equal(node.children[0].innerHTML, `20`)
  t.equal(node.children[1].innerHTML, `11`)

  first.click()
  first.click()
  first.click()
  second.click()
  second.click()
  flipper.onNext(true)

  t.equal(node.children[0].innerHTML, `14`)
  t.equal(node.children[1].innerHTML, `22`)

  flipper.onNext(true)

  t.equal(node.children[0].innerHTML, `22`)
  t.equal(node.children[1].innerHTML, `14`)

  cleanup()
})

test(`KeyedChildren: does not reset children as long as one of them is keyed`, t => {
  t.plan(12)

  const flipper = new Rx.BehaviorSubject()
  const children = flipper.scan(acc => [acc[1], acc[2], acc[3], acc[0]], [<Stub>4</Stub>, <Stub key="first">1</Stub>, <Stub>2</Stub>, <Stub>3</Stub>])
  const [node, cleanup] = renderInDoc(<div key="wrapper">{children}</div>)

  const stubs = node.querySelectorAll(`.stub`)
  const first = stubs[0]
  const second = stubs[1]
  const third = stubs[2]
  const fourth = stubs[3]

  t.equal(node.children[0].innerHTML, `10`)
  t.equal(node.children[1].innerHTML, `20`)
  t.equal(node.children[2].innerHTML, `30`)
  t.equal(node.children[3].innerHTML, `40`)

  first.click()
  second.click()
  third.click()
  fourth.click()

  t.equal(node.children[0].innerHTML, `11`)
  t.equal(node.children[1].innerHTML, `21`)
  t.equal(node.children[2].innerHTML, `31`)
  t.equal(node.children[3].innerHTML, `41`)

  flipper.onNext(true)

  t.equal(node.children[0].innerHTML, `21`)
  t.equal(node.children[1].innerHTML, `31`)
  t.equal(node.children[2].innerHTML, `41`)
  t.equal(node.children[3].innerHTML, `11`)

  cleanup()
})

test(`KeyedChildren: resets children if they aren't keyed`, t => {
  t.plan(6)

  const flipper = new Rx.BehaviorSubject()
  const children = flipper.scan(acc => [acc[1], acc[0]], [<Stub>2</Stub>, <Stub>1</Stub>])
  const [node, cleanup] = renderInDoc(<div key="wrapper">{children}</div>)

  const stubs = node.querySelectorAll(`.stub`)
  const first = stubs[0]
  const second = stubs[1]

  t.equal(node.children[0].innerHTML, `10`)
  t.equal(node.children[1].innerHTML, `20`)

  first.click()
  second.click()

  t.equal(node.children[0].innerHTML, `11`)
  t.equal(node.children[1].innerHTML, `21`)

  flipper.onNext(true)

  t.equal(node.children[0].innerHTML, `11`)
  t.equal(node.children[1].innerHTML, `21`)

  cleanup()
})
