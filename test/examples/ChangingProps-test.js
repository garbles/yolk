const test = require(`tape`)
const Yolk = require(`yolk`)
const {Rx} = Yolk

function HasChildren (props) {
  return <div>{props.child}</div>
}

test(`when a changed element changes it's list of properties instead of just the values`, t => {
  t.plan(2)

  const child = new Rx.BehaviorSubject(<span key="first">Hello!</span>)
  const component = <HasChildren child={child}/>
  const node = document.createElement(`div`)
  document.body.appendChild(node)
  Yolk.render(component, node)

  t.equal(node.innerHTML, `<div><span>Hello!</span></div>`)

  child.onNext(<span className="stub" key="second">Goodbye</span>)

  t.equal(node.innerHTML, `<div><span class="stub">Goodbye</span></div>`)
})
