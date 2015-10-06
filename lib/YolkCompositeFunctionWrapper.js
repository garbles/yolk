"use strict";

var _createEventHandler = require("./createEventHandler");
var isComponent = require("./isComponent");

function YolkCompositeFunctionWrapper() {
  this._eventHandlers = [];
  this._result = null;
}

YolkCompositeFunctionWrapper.prototype = {
  createEventHandler: function createEventHandler(mapFn, init) {
    var handler = _createEventHandler(mapFn, init);
    this._eventHandlers.push(handler);
    return handler;
  },

  destroy: function destroy() {
    var length = this._eventHandlers.length;
    var i = -1;

    while (++i < length) {
      this._eventHandlers[i].dispose();
    }

    this._result.destroy();
  }
};

YolkCompositeFunctionWrapper.create = function (fn, props, children) {
  var instance = new YolkCompositeFunctionWrapper();
  var result = fn.call(instance, props, children);

  if (!isComponent(result)) {
    throw new Error("Function did not return a valid component. See \"" + fn.name + "\".");
  }

  instance._result = result;
  return instance;
};

module.exports = YolkCompositeFunctionWrapper;