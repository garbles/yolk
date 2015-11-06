const test = require(`tape`)
const Yolk = require(`yolk`)
const {Rx} = Yolk
const renderInDoc = require(`../helpers/renderInDoc`)

function NestedObservableProps (props) {
  const {height, width} = props
  const style = {color: `blue`, height, width}

  return <div style={style} />
}

function DeeplyNestedObservableProps (props) {
  const content = props.a.map(a => a.b.c.d)

  return <div>{content}</div>
}

test(`NestedObservableProps: properly interpret properties`, t => {
  t.plan(9)
  t.timeoutAfter(100)

  const heightSubject = new Rx.BehaviorSubject(1)
  const widthSubject = new Rx.BehaviorSubject(1)
  const component = <NestedObservableProps height={heightSubject} width={widthSubject} />
  const [wrapper, cleanup] = renderInDoc(component)
  const node = wrapper.firstChild

  t.equal(node.style.color, `blue`)
  t.equal(node.style.height, `1px`)
  t.equal(node.style.width, `1px`)

  heightSubject.onNext(50)

  t.equal(node.style.color, `blue`)
  t.equal(node.style.height, `50px`)
  t.equal(node.style.width, `1px`)

  widthSubject.onNext(25)

  t.equal(node.style.color, `blue`)
  t.equal(node.style.height, `50px`)
  t.equal(node.style.width, `25px`)

  cleanup()
})

test(`NestedObservableProps: works with doubley nested observables`, t => {
  t.plan(2)
  t.timeoutAfter(100)

  const deeplyNestedHeightSubject = new Rx.BehaviorSubject(1)
  const nestedHeightSubject = new Rx.BehaviorSubject(deeplyNestedHeightSubject.asObservable())
  const heightSubject = new Rx.BehaviorSubject(nestedHeightSubject.asObservable())
  const component = <NestedObservableProps height={heightSubject} width={1} />
  const [wrapper, cleanup] = renderInDoc(component)
  const node = wrapper.firstChild

  t.equal(node.style.height, `1px`)

  deeplyNestedHeightSubject.onNext(44)

  t.equal(node.style.height, `44px`)

  cleanup()
})

test(`NestedObservableProps: works with plain objects that use nested props`, t => {
  t.plan(3)
  t.timeoutAfter(100)

  const b = new Rx.BehaviorSubject({
    c: {
      d: [new Rx.BehaviorSubject(`hello`), ` goodbye!`],
    },
  })

  const component = <DeeplyNestedObservableProps a={{b}} />
  const [node, cleanup] = renderInDoc(component)

  t.equal(node.innerHTML, `<div>hello goodbye!</div>`)

  const anotherSubject = new Rx.BehaviorSubject(`And another`)

  b.onNext({
    c: {
      d: [
        <span>Random Component</span>,
        <p>{anotherSubject}</p>,
      ],
    },
  })

  t.equal(node.innerHTML, `<div><span>Random Component</span><p>And another</p></div>`)

  anotherSubject.onNext(`Still working`)

  t.equal(node.innerHTML, `<div><span>Random Component</span><p>Still working</p></div>`)

  cleanup()
})
