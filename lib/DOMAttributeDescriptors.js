"use strict";

var kababCase = require("lodash.kebabcase");
var EventsList = require("./EventsList");

var HAS_LOWER_CASE = 0x1;
var HAS_DASH_CASE = 0x2;
var IS_ATTRIBUTE = 0x4;
var USE_PROPERTY_HOOK = 0x8;
var USE_ATTRIBUTE_HOOK = 0x10;
var USE_EVENT_HOOK = 0x20;
var CAN_BE_ARRAY_OF_STRINGS = 0x80;
var HAS_BOOLEAN_VALUE = 0x100;
var IS_STAR = 0x200;

function checkMask(value, bitmask) {
  return (value & bitmask) === bitmask;
}

var attributes = {
  // inferred by virtual-dom
  className: CAN_BE_ARRAY_OF_STRINGS,
  id: null,
  style: null,

  // attributes
  accept: IS_ATTRIBUTE,
  acceptCharset: IS_ATTRIBUTE | HAS_DASH_CASE,
  accessKey: IS_ATTRIBUTE | HAS_LOWER_CASE,
  action: IS_ATTRIBUTE,
  align: IS_ATTRIBUTE,
  alt: IS_ATTRIBUTE,
  async: IS_ATTRIBUTE | HAS_BOOLEAN_VALUE,
  autoComplete: IS_ATTRIBUTE | HAS_LOWER_CASE,
  autoFocus: IS_ATTRIBUTE | HAS_LOWER_CASE,
  autoPlay: IS_ATTRIBUTE | HAS_LOWER_CASE | HAS_BOOLEAN_VALUE,
  autoSave: IS_ATTRIBUTE | HAS_LOWER_CASE,
  bgColor: IS_ATTRIBUTE | HAS_LOWER_CASE,
  border: IS_ATTRIBUTE,
  buffered: IS_ATTRIBUTE,
  cite: IS_ATTRIBUTE,
  code: IS_ATTRIBUTE,
  codebase: IS_ATTRIBUTE,
  color: IS_ATTRIBUTE,
  colSpan: IS_ATTRIBUTE | HAS_LOWER_CASE,
  content: IS_ATTRIBUTE,
  contentEditable: IS_ATTRIBUTE | HAS_LOWER_CASE,
  coords: IS_ATTRIBUTE,
  "default": IS_ATTRIBUTE,
  defer: IS_ATTRIBUTE | HAS_BOOLEAN_VALUE,
  dir: IS_ATTRIBUTE,
  dirName: IS_ATTRIBUTE | HAS_LOWER_CASE,
  download: IS_ATTRIBUTE,
  draggable: IS_ATTRIBUTE,
  dropZone: IS_ATTRIBUTE | HAS_LOWER_CASE,
  email: IS_ATTRIBUTE,
  encType: IS_ATTRIBUTE | HAS_LOWER_CASE,
  file: IS_ATTRIBUTE,
  "for": IS_ATTRIBUTE,
  headers: IS_ATTRIBUTE,
  height: IS_ATTRIBUTE,
  hidden: IS_ATTRIBUTE | HAS_BOOLEAN_VALUE,
  high: IS_ATTRIBUTE,
  href: IS_ATTRIBUTE,
  hrefLang: IS_ATTRIBUTE | HAS_LOWER_CASE,
  httpEquiv: IS_ATTRIBUTE | HAS_DASH_CASE,
  icon: IS_ATTRIBUTE,
  isMap: IS_ATTRIBUTE | HAS_LOWER_CASE,
  itemProp: IS_ATTRIBUTE | HAS_LOWER_CASE,
  keyType: IS_ATTRIBUTE | HAS_LOWER_CASE,
  kind: IS_ATTRIBUTE,
  label: IS_ATTRIBUTE,
  lang: IS_ATTRIBUTE,
  language: IS_ATTRIBUTE,
  low: IS_ATTRIBUTE,
  max: IS_ATTRIBUTE,
  method: IS_ATTRIBUTE,
  min: IS_ATTRIBUTE,
  name: IS_ATTRIBUTE,
  noValidate: IS_ATTRIBUTE | HAS_LOWER_CASE | HAS_BOOLEAN_VALUE,
  open: IS_ATTRIBUTE | HAS_BOOLEAN_VALUE,
  optimum: IS_ATTRIBUTE,
  password: IS_ATTRIBUTE,
  pattern: IS_ATTRIBUTE,
  ping: IS_ATTRIBUTE,
  placeholder: IS_ATTRIBUTE,
  poster: IS_ATTRIBUTE,
  preload: IS_ATTRIBUTE,
  pubdate: IS_ATTRIBUTE,
  radioGroup: IS_ATTRIBUTE | HAS_LOWER_CASE,
  rel: IS_ATTRIBUTE,
  required: IS_ATTRIBUTE | HAS_BOOLEAN_VALUE,
  reversed: IS_ATTRIBUTE,
  rowSpan: IS_ATTRIBUTE | HAS_LOWER_CASE,
  sandbox: IS_ATTRIBUTE,
  scope: IS_ATTRIBUTE,
  scoped: IS_ATTRIBUTE | HAS_BOOLEAN_VALUE,
  shape: IS_ATTRIBUTE,
  span: IS_ATTRIBUTE,
  spellCheck: IS_ATTRIBUTE | HAS_LOWER_CASE,
  src: IS_ATTRIBUTE,
  srcLang: IS_ATTRIBUTE | HAS_LOWER_CASE,
  start: IS_ATTRIBUTE,
  step: IS_ATTRIBUTE,
  summary: IS_ATTRIBUTE,
  tabIndex: IS_ATTRIBUTE | HAS_LOWER_CASE,
  target: IS_ATTRIBUTE,
  text: IS_ATTRIBUTE,
  title: IS_ATTRIBUTE,
  type: IS_ATTRIBUTE,
  useMap: IS_ATTRIBUTE | HAS_LOWER_CASE,
  wrap: IS_ATTRIBUTE,

  // attributes only accessible via attribute namespace
  allowFullScreen: USE_ATTRIBUTE_HOOK | HAS_LOWER_CASE | HAS_BOOLEAN_VALUE,
  allowTransparency: USE_ATTRIBUTE_HOOK, // not downcased
  capture: USE_ATTRIBUTE_HOOK | HAS_BOOLEAN_VALUE,
  charset: USE_ATTRIBUTE_HOOK,
  challenge: USE_ATTRIBUTE_HOOK,
  cols: USE_ATTRIBUTE_HOOK,
  contextMenu: USE_ATTRIBUTE_HOOK | HAS_LOWER_CASE,
  dateTime: USE_ATTRIBUTE_HOOK | HAS_LOWER_CASE,
  disabled: USE_ATTRIBUTE_HOOK | HAS_BOOLEAN_VALUE,
  form: USE_ATTRIBUTE_HOOK,
  formAction: USE_ATTRIBUTE_HOOK | HAS_LOWER_CASE,
  formEncType: USE_ATTRIBUTE_HOOK | HAS_LOWER_CASE,
  formMethod: USE_ATTRIBUTE_HOOK | HAS_LOWER_CASE,
  formTarget: USE_ATTRIBUTE_HOOK | HAS_LOWER_CASE,
  frameBorder: USE_ATTRIBUTE_HOOK | HAS_LOWER_CASE,
  inputMode: USE_ATTRIBUTE_HOOK | HAS_LOWER_CASE,
  is: USE_ATTRIBUTE_HOOK,
  list: USE_ATTRIBUTE_HOOK,
  manifest: USE_ATTRIBUTE_HOOK,
  maxLength: USE_ATTRIBUTE_HOOK | HAS_LOWER_CASE,
  media: USE_ATTRIBUTE_HOOK,
  minLength: USE_ATTRIBUTE_HOOK | HAS_LOWER_CASE,
  role: USE_ATTRIBUTE_HOOK,
  rows: USE_ATTRIBUTE_HOOK,
  seamless: USE_ATTRIBUTE_HOOK | HAS_BOOLEAN_VALUE,
  size: USE_ATTRIBUTE_HOOK,
  sizes: USE_ATTRIBUTE_HOOK,
  srcSet: USE_ATTRIBUTE_HOOK | HAS_LOWER_CASE,
  width: USE_ATTRIBUTE_HOOK,
  wmode: USE_ATTRIBUTE_HOOK,

  // attributes only accessible via setting property in JS
  checked: USE_PROPERTY_HOOK | HAS_BOOLEAN_VALUE,
  controls: USE_PROPERTY_HOOK | HAS_BOOLEAN_VALUE,
  loop: USE_PROPERTY_HOOK | HAS_BOOLEAN_VALUE,
  multiple: USE_PROPERTY_HOOK | HAS_BOOLEAN_VALUE,
  readOnly: USE_PROPERTY_HOOK | HAS_LOWER_CASE | HAS_BOOLEAN_VALUE,
  selected: USE_PROPERTY_HOOK | HAS_BOOLEAN_VALUE,
  srcDoc: USE_PROPERTY_HOOK | HAS_LOWER_CASE,
  value: USE_PROPERTY_HOOK,

  // X-* attributes
  data: IS_STAR
};

// events
var length = EventsList.length;
var i = -1;

while (++i < length) {
  var _event = EventsList[i];
  attributes["on" + _event] = HAS_LOWER_CASE | USE_EVENT_HOOK;
}

var keys = Object.keys(attributes);
var isStandard = true;
var DOMAttributeDescriptors = {};
length = keys.length;
i = -1;

while (++i < length) {
  var key = keys[i];
  var attr = attributes[key];
  var hasLowerCase = checkMask(attr, HAS_LOWER_CASE);
  var hasDashCase = checkMask(attr, HAS_DASH_CASE);
  var isAttribute = checkMask(attr, IS_ATTRIBUTE);
  var usePropertyHook = checkMask(attr, USE_PROPERTY_HOOK);
  var useAttributeHook = checkMask(attr, USE_ATTRIBUTE_HOOK);
  var useEventHook = checkMask(attr, USE_EVENT_HOOK);
  var canBeArrayOfStrings = checkMask(attr, CAN_BE_ARRAY_OF_STRINGS);
  var hasBooleanValue = checkMask(attr, HAS_BOOLEAN_VALUE);
  var isStar = checkMask(attr, IS_STAR);
  var computed = undefined;

  if (hasLowerCase) {
    computed = key.toLowerCase();
  } else if (hasDashCase) {
    computed = kababCase(key);
  }

  DOMAttributeDescriptors[key] = {
    isAttribute: isAttribute,
    isStandard: isStandard,
    usePropertyHook: usePropertyHook,
    useAttributeHook: useAttributeHook,
    useEventHook: useEventHook,
    canBeArrayOfStrings: canBeArrayOfStrings,
    hasBooleanValue: hasBooleanValue,
    isStar: isStar,
    computed: computed
  };
}

module.exports = DOMAttributeDescriptors;
