"use strict";

function CustomEventHook(name, fn) {
  this.name = name.substr(2);
  this.fn = fn;
}

CustomEventHook.prototype = {
  type: "CustomEventHook",

  hook: function hook(node) {
    node.addEventListener(this.name, this.fn);
  },

  unhook: function unhook(node) {
    node.removeEventListener(this.name, this.fn);
  }
};

module.exports = CustomEventHook;