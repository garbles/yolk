"use strict";

var _createEventHandler = require("./createEventHandler");
var isComponent = require("./isComponent");
var addProperties = require("./addProperties");

var publicInterface = {
  getVirtualNode: function getVirtualNode() {
    return this._result;
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

function YolkCompositeFunctionWrapper(fn, props$, children$) {
  this._eventHandlers = [];
  this._result = fn.call(this, props$, children$);
  addProperties(this, publicInterface);
}

YolkCompositeFunctionWrapper.prototype = {
  createEventHandler: function createEventHandler(mapFn, init) {
    var handler = _createEventHandler(mapFn, init);
    this._eventHandlers.push(handler);
    return handler;
  }
};

YolkCompositeFunctionWrapper.create = function (fn, props$, children$) {
  var instance = new YolkCompositeFunctionWrapper(fn, props$, children$);

  if (!isComponent(instance.getVirtualNode())) {
    throw new Error("Function did not return a valid component. See \"" + fn.name + "\".");
  }

  return instance;
};

module.exports = YolkCompositeFunctionWrapper;