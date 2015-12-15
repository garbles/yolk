'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createElement = require('./createElement');

var _createElement2 = _interopRequireDefault(_createElement);

var _HTMLTags = require('./HTMLTags');

var _HTMLTags2 = _interopRequireDefault(_HTMLTags);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var boundCreateElement = function boundCreateElement(tagName) {
  return function (props) {
    for (var _len = arguments.length, children = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      children[_key - 1] = arguments[_key];
    }

    return _createElement2.default.apply(undefined, [tagName, props].concat(children));
  };
};

var helpers = {};
var length = _HTMLTags2.default.length;
var i = -1;

while (++i < length) {
  var tagName = _HTMLTags2.default[i];
  helpers[tagName] = boundCreateElement(tagName);
}

exports.default = helpers;