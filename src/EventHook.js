import { default as evStore } from 'ev-store'

function EventHook (value) {
  this.value = value
}

EventHook.prototype = {
  hook (node, propertyName) {
    const es = evStore(node)
    const propName = propertyName.substr(2).toLowerCase()

    es[propName] = this.value
  },

  unhook (node, propertyName) {
    const es = evStore(node)
    const propName = propertyName.substr(2).toLowerCase()

    es[propName] = undefined
  },
}

export default EventHook
