const domDelegator = require(`dom-delegator`)
const EventsList = require(`./EventsList`)
const instance = domDelegator({defaultEvents: false})

const length = EventsList.length
let i = -1

while (++i < length) {
  instance.listenTo(EventsList[i].toLowerCase())
}

module.exports = instance
