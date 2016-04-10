'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeEventListener = exports.addEventListener = undefined;

var _domDelegator = require('dom-delegator');

var _domDelegator2 = _interopRequireDefault(_domDelegator);

var _domDelegator3 = require('dom-delegator/dom-delegator');

var _domDelegator4 = _interopRequireDefault(_domDelegator3);

var _eventsList = require('./eventsList');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var delegator /*: DomDelegator*/ = (0, _domDelegator2.default)(); /* @flow */

var len /*: number*/ = _eventsList.eventsList.length;
var i /*: number*/ = -1;

while (++i < len) {
  var event /*: string*/ = _eventsList.eventsList[i].toLowerCase();
  delegator.listenTo(event);
}

var addEventListener = exports.addEventListener = delegator.addEventListener.bind(delegator);
var removeEventListener = exports.removeEventListener = delegator.removeEventListener.bind(delegator);