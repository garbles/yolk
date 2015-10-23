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

test(`properly interpret properties`, t => {
  t.plan(3)

  const heightSubject = new Rx.BehaviorSubject(1)
  const widthSubject = new Rx.BehaviorSubject(1)
  const component = <NestedObservableProps height={heightSubject} width={widthSubject} />
  const [node, cleanup] = renderInDoc(component)

  t.equal(node.innerHTML, `<div style="color: blue; height: 1px; width: 1px; "></div>`)

  heightSubject.onNext(50)

  t.equal(node.innerHTML, `<div style="color: blue; width: 1px; height: 50px; "></div>`)

  widthSubject.onNext(25)

  t.equal(node.innerHTML, `<div style="color: blue; height: 50px; width: 25px; "></div>`)

  cleanup()
})

test(`works with doubley nested observables`, t => {
  t.plan(2)

  const deeplyNestedHeightSubject = new Rx.BehaviorSubject(1)
  const nestedHeightSubject = new Rx.BehaviorSubject(deeplyNestedHeightSubject.asObservable())
  const heightSubject = new Rx.BehaviorSubject(nestedHeightSubject.asObservable())
  const component = <NestedObservableProps height={heightSubject} width={1} />
  const [node, cleanup] = renderInDoc(component)

  t.equal(node.innerHTML, `<div style="color: blue; height: 1px; width: 1px; "></div>`)

  deeplyNestedHeightSubject.onNext(44)

  t.equal(node.innerHTML, `<div style="color: blue; width: 1px; height: 44px; "></div>`)

  cleanup()
})

test(`works with plain objects that use nested props`, t => {
  t.plan(3)

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
