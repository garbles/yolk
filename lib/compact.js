'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = compact;

var _isDefined = require('./isDefined');

var _isDefined2 = _interopRequireDefault(_isDefined);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function compact(arr) {
  var length = arr.length;
  var newArr = [];
  var i = -1;

  while (++i < length) {
    var value = arr[i];
    if ((0, _isDefined2.default)(value) && value !== false) {
      newArr.push(value);
    }
  }

  return newArr;
}