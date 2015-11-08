"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var kababCase = require("lodash.kebabcase");
var SoftSetHook = require("yolk-virtual-dom/virtual-hyperscript/hooks/soft-set-hook");
var AttributeHook = require("yolk-virtual-dom/virtual-hyperscript/hooks/attribute-hook");
var EventHook = require("./EventHook");
var compact = require("./compact");

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

module.exports = function transformProperty(props, key, value) {
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
    var _length = keys.length;
    var i = -1;

    while (++i < _length) {
      var __key = keys[i];
      var __value = value[__key];
      transformProperty(props, key + "-" + kababCase(__key), __value, STAR_DESCRIPTOR);
    }

    return props;
  }

  _key = descriptor.computed || key;

  if (descriptor.canBeArrayOfStrings && Array.isArray(_value)) {
    _value = compact(_value).join(" ");
  }

  if (descriptor.isAttribute) {
    props.attributes[_key] = _value;
  } else if (descriptor.usePropertyHook) {
    props[_key] = new SoftSetHook(_value);
  } else if (descriptor.useEventHook) {
    props[_key] = new EventHook(_value);
  } else if (descriptor.useAttributeHook) {
    props[_key] = new AttributeHook(null, _value);
  } else if (descriptor.isStandard) {
    props[_key] = _value;
  }

  return props;
};