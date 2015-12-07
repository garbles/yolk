"use strict";

var createEventHandler_ = require("./createEventHandler");
var isComponent = require("./isComponent");

function YolkCompositeFunctionWrapper(fn, props, children) {
  var eventHandlers = [];

  function createEventHandler(mapFn, init) {
    var handler = createEventHandler_(mapFn, init);
    eventHandlers.push(handler);
    return handler;
  }

  this.vNode = fn.call(null, { props: props, children: children, createEventHandler: createEventHandler });
  this.eventHandlers = eventHandlers;
}

YolkCompositeFunctionWrapper.create = function (fn, props$, children$) {
  var instance = new YolkCompositeFunctionWrapper(fn, props$, children$);

  if (!isComponent(instance.vNode)) {
    throw new Error("Function did not return a valid component. See \"" + fn.name + "\".");
  }

  return instance;
};

YolkCompositeFunctionWrapper.destroy = function (instance) {
  var length = instance.eventHandlers.length;
  var i = -1;

  while (++i < length) {
    instance.eventHandlers[i].dispose();
  }

  instance.vNode.destroy();
};

module.exports = YolkCompositeFunctionWrapper;