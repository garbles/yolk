'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = transformProperty;

var _lodash = require('lodash.kebabcase');

var _lodash2 = _interopRequireDefault(_lodash);

var _softSetHook = require('yolk-virtual-dom/virtual-hyperscript/hooks/soft-set-hook');

var _softSetHook2 = _interopRequireDefault(_softSetHook);

var _attributeHook = require('yolk-virtual-dom/virtual-hyperscript/hooks/attribute-hook');

var _attributeHook2 = _interopRequireDefault(_attributeHook);

var _EventHook = require('./EventHook');

var _EventHook2 = _interopRequireDefault(_EventHook);

var _compact = require('./compact');

var _compact2 = _interopRequireDefault(_compact);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NULL_DESCRIPTOR = {
  isAttribute: false,
  isStandard: false,
  usePropertyHook: false,
  useEventHook: false,
  useAttributeHook: false,
  canBeArrayOfStrings: false,
  hasBooleanValue: false,
  isStar: false,
  computed: undefined
};

var STAR_DESCRIPTOR = _extends({}, NULL_DESCRIPTOR, { isAttribute: true, isStandard: true });

function transformProperty(props, key, value) {
  var descriptor = arguments.length <= 3 || arguments[3] === undefined ? NULL_DESCRIPTOR : arguments[3];

  var _value = value;
  var _key = undefined;

  if (!descriptor.isStandard) {
    return props;
  }

  if (descriptor.hasBooleanValue && _value !== true && _value !== false) {
    return props;
  }

  if (descriptor.isStar) {
    var keys = Object.keys(value);
    var length = keys.length;
    var i = -1;

    while (++i < length) {
      var __key = keys[i];
      var __value = value[__key];
      transformProperty(props, key + '-' + (0, _lodash2.default)(__key), __value, STAR_DESCRIPTOR);
    }

    return props;
  }

  _key = descriptor.computed || key;

  if (descriptor.canBeArrayOfStrings && Array.isArray(_value)) {
    _value = (0, _compact2.default)(_value).join(' ');
  }

  if (descriptor.isAttribute) {
    props.attributes[_key] = _value;
  } else if (descriptor.usePropertyHook) {
    props[_key] = new _softSetHook2.default(_value);
  } else if (descriptor.useEventHook) {
    props[_key] = new _EventHook2.default(_value);
  } else if (descriptor.useAttributeHook) {
    props[_key] = new _attributeHook2.default(null, _value);
  } else if (descriptor.isStandard) {
    props[_key] = _value;
  }

  return props;
}