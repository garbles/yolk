const domDelegator = require(`dom-delegator`)
const EventsList = require(`./EventsList`)

module.exports = function delegator (node) {
  const instance = domDelegator(node)

  const length = EventsList.length
  let i = -1

  while (++i < length) {
    instance.listenTo(EventsList[i].toLowerCase())
  }

  return instance
}
