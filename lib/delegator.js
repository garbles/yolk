'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = delegator;

var _domDelegator = require('dom-delegator');

var _domDelegator2 = _interopRequireDefault(_domDelegator);

var _EventsList = require('./EventsList');

var _EventsList2 = _interopRequireDefault(_EventsList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function delegator(node) {
  var instance = (0, _domDelegator2.default)(node);

  var length = _EventsList2.default.length;
  var i = -1;

  while (++i < length) {
    instance.listenTo(_EventsList2.default[i].toLowerCase());
  }

  return instance;
}