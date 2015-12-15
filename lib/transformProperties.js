'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = transformProperties;

var _DOMAttributeDescriptors = require('./DOMAttributeDescriptors');

var _DOMAttributeDescriptors2 = _interopRequireDefault(_DOMAttributeDescriptors);

var _transformStyle = require('./transformStyle');

var _transformStyle2 = _interopRequireDefault(_transformStyle);

var _transformProperty = require('./transformProperty');

var _transformProperty2 = _interopRequireDefault(_transformProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function transformProperties(props) {
  var keys = Object.keys(props);
  var length = keys.length;
  var newProps = { attributes: {} };
  var i = -1;

  while (++i < length) {
    var key = keys[i];
    var value = props[key];

    if (key === 'style') {
      (0, _transformStyle2.default)(newProps, value);
    } else {
      (0, _transformProperty2.default)(newProps, key, value, _DOMAttributeDescriptors2.default[key]);
    }
  }

  return newProps;
}