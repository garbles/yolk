/** @jsx createElement */

const Rx = require(`rx`)
const createElement = require(`createElement`)
const createEventHandler = require(`createEventHandler`)
const render = require(`render`)

function VaryingBaseChildrenFromProps (props) {
  const numbers = props.map(p => p.numbers).map(nums => {
    return nums.map(num => <li>{num}</li>)
  })

  return (
    <ul>
      {numbers}
    </ul>
  )
}

function VaryingWidgetChildrenFromProps (props) {
  const numbers = props.map(p => p.numbers).map(nums => {
    return nums.map(num => <Stub>{num}</Stub>)
  })

  return <div>{numbers}</div>
}

function Stub (props, children) {
  const handleClick = createEventHandler(1)
  const count = handleClick.scan((acc, next) => acc + next, 0)

  return <p id="stub" onClick={handleClick}>{children}{count}</p>
}

describe(`A list of children which varies in length`, () => {

  it(`renders a varying number of base children`, () => {
    const numbersSubject = new Rx.BehaviorSubject(1)
    const numbersObservable = numbersSubject.scan((acc, next) => acc.concat(next), [])

    const component = <VaryingBaseChildrenFromProps numbers={numbersObservable} />
    const node = document.createElement(`div`)
    render(component, node)

    assert.equal(node.innerHTML, `<ul><li>1</li></ul>`)
    numbersSubject.onNext(2)
    numbersSubject.onNext(3)

    assert.equal(node.innerHTML, `<ul><li>1</li><li>2</li><li>3</li></ul>`)
  })

  it(`renders a varying number of widget children`, () => {
    const numbersSubject = new Rx.BehaviorSubject(1)
    const numbersObservable = numbersSubject.scan((acc, next) => acc.concat(next), [])

    const component = <VaryingWidgetChildrenFromProps numbers={numbersObservable} />
    const node = document.createElement(`div`)
    render(component, node)

    assert.equal(node.innerHTML, `<div><p id="stub">10</p></div>`)

    const stubDiv = node.querySelector(`#stub`)
    stubDiv.click()
    stubDiv.click()
    stubDiv.click()
    stubDiv.click()
    stubDiv.click()

    assert.equal(node.innerHTML, `<div><p id="stub">15</p></div>`)

    numbersSubject.onNext(2)
    numbersSubject.onNext(3)

    assert.equal(node.innerHTML, `<div><p id="stub">15</p><p id="stub">20</p><p id="stub">30</p></div>`)
  })

})
