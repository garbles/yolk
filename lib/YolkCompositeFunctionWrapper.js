'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createEventHandler = require('./createEventHandler');

var _createEventHandler2 = _interopRequireDefault(_createEventHandler);

var _isComponent = require('./isComponent');

var _isComponent2 = _interopRequireDefault(_isComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function YolkCompositeFunctionWrapper(fn, props, children) {
  var eventHandlers = [];

  function createEventHandler(mapFn, init) {
    var handler = (0, _createEventHandler2.default)(mapFn, init);
    eventHandlers.push(handler);
    return handler;
  }

  this.vNode = fn.call(null, { props: props, children: children, createEventHandler: createEventHandler });
  this.eventHandlers = eventHandlers;
}

YolkCompositeFunctionWrapper.create = function (fn, props$, children$) {
  var instance = new YolkCompositeFunctionWrapper(fn, props$, children$);

  if (!(0, _isComponent2.default)(instance.vNode)) {
    throw new Error('Function did not return a valid component. See "' + fn.name + '".');
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

exports.default = YolkCompositeFunctionWrapper;