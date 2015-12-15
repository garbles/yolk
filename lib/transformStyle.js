'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = transformStyle;

var _isNumber = require('./isNumber');

var _isNumber2 = _interopRequireDefault(_isNumber);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var unitlessNumberProperties = {
  animationIterationCount: true,
  boxFlex: true,
  boxFlexGroup: true,
  boxOrdinalGroup: true,
  columnCount: true,
  fillOpacity: true,
  flex: true,
  flexGrow: true,
  flexPositive: true,
  flexShrink: true,
  flexNegative: true,
  flexOrder: true,
  fontWeight: true,
  lineClamp: true,
  lineHeight: true,
  opacity: true,
  order: true,
  orphans: true,
  stopOpacity: true,
  strokeDashoffset: true,
  strokeOpacity: true,
  strokeWidth: true,
  tabSize: true,
  widows: true,
  zIndex: true,
  zoom: true
};

function transformStyle(props, style) {
  if (!style) {
    return false;
  }

  var keys = Object.keys(style);
  var length = keys.length;
  var newStyle = {};

  for (var i = 0; i < length; i++) {
    var key = keys[i];
    var isUnitlessNumber = unitlessNumberProperties[key] || false;
    var value = style[key];

    if (!isUnitlessNumber && (0, _isNumber2.default)(value)) {
      value = value + 'px';
    }

    newStyle[key] = value;
  }

  props.style = newStyle;

  return props;
}