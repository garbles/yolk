'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _evStore = require('ev-store');

var _evStore2 = _interopRequireDefault(_evStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function EventHook(value) {
  this.value = value;
}

EventHook.prototype = {
  hook: function hook(node, propertyName) {
    var es = (0, _evStore2.default)(node);
    var propName = propertyName.substr(2).toLowerCase();

    es[propName] = this.value;
  },
  unhook: function unhook(node, propertyName) {
    var es = (0, _evStore2.default)(node);
    var propName = propertyName.substr(2).toLowerCase();

    es[propName] = undefined;
  }
};

exports.default = EventHook;