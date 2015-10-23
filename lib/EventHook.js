"use strict";

var evStore = require("ev-store");

function EventHook(value) {
  this.value = value;
}

EventHook.prototype = {
  hook: function hook(node, propertyName) {
    var es = evStore(node);
    var propName = propertyName.substr(2).toLowerCase();

    es[propName] = this.value;
  },

  unhook: function unhook(node, propertyName) {
    var es = evStore(node);
    var propName = propertyName.substr(2).toLowerCase();

    es[propName] = undefined;
  }
};

module.exports = EventHook;