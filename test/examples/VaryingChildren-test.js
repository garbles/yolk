import { default as test } from 'tape'
import { h, Rx } from 'yolk'
import { default as renderInDoc } from '../helpers/renderInDoc'

function VaryingBaseChildrenFromProps ({props}) {
  const numbers = props.numbers.map(nums => {
    return nums.map(num => <li>{num}</li>)
  })

  return (
    <ul>
      {numbers}
    </ul>
  )
}

function VaryingWidgetChildrenFromProps ({props}) {
  const numbers = props.numbers.map(nums => {
    return nums.map(num => <Stub>{num}</Stub>)
  })

  return <div>{numbers}</div>
}

function Stub ({children, createEventHandler}) {
  const handleClick = createEventHandler(() => 1, 0)
  const count = handleClick.scan((acc, next) => acc + next, 0)

  return <button id="stub" onClick={handleClick}>{children}{count}</button>
}

test(`VaryingChildren: renders a varying number of base children`, t => {
  t.plan(10)

  const numbersSubject = new Rx.BehaviorSubject(1)
  const numbersObservable = numbersSubject.scan((acc, next) => acc.concat(next), [])

  const component = <VaryingBaseChildrenFromProps numbers={numbersObservable} />
  const [node, cleanup] = renderInDoc(component)

  t.equal(node.tagName, `UL`)
  t.equal(node.children[0].tagName, `LI`)
  t.equal(node.children[0].innerHTML, `1`)

  numbersSubject.onNext(2)
  numbersSubject.onNext(3)

  t.equal(node.tagName, `UL`)
  t.equal(node.children[0].tagName, `LI`)
  t.equal(node.children[0].innerHTML, `1`)
  t.equal(node.children[1].tagName, `LI`)
  t.equal(node.children[1].innerHTML, `2`)
  t.equal(node.children[2].tagName, `LI`)
  t.equal(node.children[2].innerHTML, `3`)

  cleanup()
})

test(`VaryingChildren: renders a varying number of widget children`, t => {
  t.plan(8)

  const numbersSubject = new Rx.BehaviorSubject(1)
  const numbersObservable = numbersSubject.scan((acc, next) => acc.concat(next), [])

  const component = <VaryingWidgetChildrenFromProps numbers={numbersObservable} />
  const [node, cleanup] = renderInDoc(component)

  t.equal(node.tagName, `DIV`)
  t.equal(node.firstChild.tagName, `BUTTON`)
  t.equal(node.firstChild.id, `stub`)
  t.equal(node.firstChild.innerHTML, `10`)

  const stubDiv = node.querySelector(`#stub`)
  stubDiv.click()
  stubDiv.click()
  stubDiv.click()
  stubDiv.click()
  stubDiv.click()

  t.equal(node.children[0].innerHTML, `15`)

  numbersSubject.onNext(2)
  numbersSubject.onNext(3)

  t.equal(node.children[0].innerHTML, `15`)
  t.equal(node.children[1].innerHTML, `20`)
  t.equal(node.children[2].innerHTML, `30`)

  cleanup()
})
