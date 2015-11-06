const test = require(`tape`)
const Rx = require(`rx`)
const CompositePropSubject = require(`CompositePropSubject`)

test(`CompositePropSubject: creates an object of BehaviorSubjects`, t => {
  t.plan(7)
  t.timeoutAfter(100)

  const props = {
    a: 1,
    b () {},
    c: `some string`,
    d: {},
  }

  const obj = new CompositePropSubject(props).asSubjectObject()

  // exposes subject methods
  t.ok(obj.a.onNext)
  t.ok(obj.a.onCompleted)
  t.ok(obj.a.onError)

  Object.keys(props).forEach(key => {
    obj[key].take(1).subscribe(val => t.equal(val, props[key]))
  })
})

test(`CompositePropSubject: creates an object of anonymous Observables`, t => {
  t.plan(7)
  t.timeoutAfter(100)

  const props = {
    a: 1,
    b () {},
    c: `some string`,
    d: {},
  }

  const obj = new CompositePropSubject(props).asObservableObject()

  // does not expect subject methods
  t.notOk(obj.a.onNext)
  t.notOk(obj.a.onCompleted)
  t.notOk(obj.a.onError)

  Object.keys(props).forEach(key => {
    obj[key].take(1).subscribe(val => t.equal(val, props[key]))
  })
})

test(`CompositePropSubject: flattens Observables`, t => {
  t.plan(1)
  t.timeoutAfter(100)

  const value = {b: 55}

  const props = {
    a: new Rx.BehaviorSubject([new Rx.BehaviorSubject(value)]),
  }

  const obj = new CompositePropSubject(props).asObservableObject()

  obj.a.take(1).subscribe(val => t.deepEqual(val, [value]))
})

test(`CompositePropSubject: can update the Observable values`, t => {
  t.plan(4)
  t.timeoutAfter(100)

  const props = {
    a: 1,
    b: `some string`,
  }

  const newProps = {
    a: 123,
    b: `some other string`,
  }

  const sub = new CompositePropSubject(props)
  const obj = sub.asObservableObject()

  obj.a.take(1).subscribe(val => t.equal(val, props.a))
  obj.b.take(1).subscribe(val => t.equal(val, props.b))
  obj.a.skip(1).take(1).subscribe(val => t.equal(val, newProps.a))
  obj.b.skip(1).take(1).subscribe(val => t.equal(val, newProps.b))

  sub.onNext(newProps)
})

test(`CompositePropSubject: can dispose of underlying subjects`, t => {
  t.plan(2)
  t.timeoutAfter(100)

  const props = {
    a: 1,
    b: `some string`,
  }

  const sub = new CompositePropSubject(props)
  const obj = sub.asSubjectObject()

  sub.dispose()

  t.ok(obj.a.isDisposed)
  t.ok(obj.b.isDisposed)
})
