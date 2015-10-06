"use strict";

var kababCase = require("lodash.kebabcase");
var SoftSetHook = require("virtual-dom/virtual-hyperscript/hooks/soft-set-hook");
var AttributeHook = require("virtual-dom/virtual-hyperscript/hooks/attribute-hook");
var CustomEventHook = require("./CustomEventHook");
var compact = require("./compact");

var IS_DATA_MATCHER = /^data[A-Z]/;

var EMPTY_PROP = {
  isAttribute: false,
  isStandard: false,
  usePropertyHook: false,
  useAttributeHook: false,
  useCustomEventHook: false,
  canBeArrayOfStrings: false,
  hasBooleanValue: false
};

module.exports = function transformProperty(props, key, value, property) {
  var _property = property || EMPTY_PROP;
  var isDataAttribute = false;
  var _value = value;
  var _key = undefined;

  if (_property.isStandard) {
    _key = _property.computed;
  } else {
    isDataAttribute = IS_DATA_MATCHER.test(key);

    if (isDataAttribute) {
      _key = kababCase(key);
    }
  }

  if (_property.canBeArrayOfStrings && Array.isArray(value)) {
    _value = compact(value).join(" ");
  } else if (_property.hasBooleanValue && !value) {
    return props;
  }

  if (_property.isAttribute || isDataAttribute) {
    props.attributes[_key] = _value;
  } else if (_property.usePropertyHook) {
    props[_key] = new SoftSetHook(_value);
  } else if (_property.useCustomEventHook) {
    props[_key] = new CustomEventHook(_key, _value);
  } else if (_property.useAttributeHook) {
    props[_key] = new AttributeHook(_value);
  } else if (_property.isStandard) {
    props[_key] = _value;
  }

  return props;
};