function CustomEventHook (name, fn) {
  if (!(this instanceof CustomEventHook)) {
    return new CustomEventHook(name, fn)
  }

  this.name = name.substr(2)
  this.fn = fn
}

CustomEventHook.prototype = {
  type: `CustomEventHook`,

  hook (node) {
    node.addEventListener(this.name, this.fn)
  },

  unhook (node) {
    node.removeEventListener(this.name, this.fn)
  },
}

module.exports = CustomEventHook
