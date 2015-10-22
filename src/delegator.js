const domDelegator = require(`dom-delegator`)
const DOMEventsList = require(`./DOMEventsList`)
const instance = domDelegator({defaultEvents: false})

const length = DOMEventsList.length
let i = -1

while (++i < length) {
  instance.listenTo(DOMEventsList[i].toLowerCase())
}

module.exports = instance
