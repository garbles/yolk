function getPooled (...args) {
  const Klass = this

  if (Klass.instancePool.length) {
    const instance = Klass.instancePool.pop()
    Klass.apply(instance, args)
    return instance
  } else {
    return new Klass(...args)
  }
}

function releaseInstance (instance) {
  const Klass = this
  Klass.instancePool.push(instance)
}

module.exports = function actsAsPoolable (poolSize) {

  return function (Klass) {
    Klass.instancePool = []
    Klass.poolSize = poolSize
    Klass.getPooled = getPooled
    Klass.releaseInstance = releaseInstance

    return Klass
  }

}
