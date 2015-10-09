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

module.exports = function transformProperty(props, key, value) {
  var property = arguments.length <= 3 || arguments[3] === undefined ? EMPTY_PROP : arguments[3];

  var isDataAttribute = false;
  var _value = value;
  var _key = undefined;

  if (property.isStandard) {
    _key = property.computed;
  } else {
    isDataAttribute = IS_DATA_MATCHER.test(key);

    if (isDataAttribute) {
      _key = kababCase(key);
    }
  }

  if (property.canBeArrayOfStrings && Array.isArray(value)) {
    _value = compact(value).join(" ");
  } else if (property.hasBooleanValue && !value) {
    return props;
  }

  if (property.isAttribute || isDataAttribute) {
    props.attributes[_key] = _value;
  } else if (property.usePropertyHook) {
    props[_key] = new SoftSetHook(_value);
  } else if (property.useCustomEventHook) {
    props[_key] = new CustomEventHook(_key, _value);
  } else if (property.useAttributeHook) {
    props[_key] = new AttributeHook(_value);
  } else if (property.isStandard) {
    props[_key] = _value;
  }

  return props;
};