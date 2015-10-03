const test = require(`tape`)
const Rx = require(`rx`)
const YolkCompositeComponent = require(`YolkCompositeComponent`)
const YolkBaseComponent = require(`YolkBaseComponent`)

test(`composite component raises when it doesn't return an element`, t => {
  t.plan(6)

  const baseInstance = new YolkBaseComponent(`div`)

  function ComponentReturningNothing () {
    return null
  }

  function ComponentReturningObservable () {
    return Rx.Observable.just(baseInstance)
  }

  function ComponentReturningPlainObject () {
    return {baseInstance}
  }

  function ComponentReturningArray () {
    return [baseInstance]
  }

  function ComponentReturningBase () {
    return baseInstance
  }

  function ComponentReturningWidgetLike () {
    return {
      type: `Widget`,
      init () {},
    }
  }

  t.throws(() => new YolkCompositeComponent(ComponentReturningNothing).init())
  t.throws(() => new YolkCompositeComponent(ComponentReturningObservable).init())
  t.throws(() => new YolkCompositeComponent(ComponentReturningPlainObject).init())
  t.throws(() => new YolkCompositeComponent(ComponentReturningArray).init())
  t.doesNotThrow(() => new YolkCompositeComponent(ComponentReturningBase).init())
  t.doesNotThrow(() => new YolkCompositeComponent(ComponentReturningWidgetLike).init())
})
