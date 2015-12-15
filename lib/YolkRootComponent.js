'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.render = render;

var _createElement = require('yolk-virtual-dom/create-element');

var _createElement2 = _interopRequireDefault(_createElement);

var _diff = require('yolk-virtual-dom/diff');

var _diff2 = _interopRequireDefault(_diff);

var _patch = require('yolk-virtual-dom/patch');

var _patch2 = _interopRequireDefault(_patch);

var _initializeWidgets = require('yolk-virtual-dom/initialize-widgets');

var _initializeWidgets2 = _interopRequireDefault(_initializeWidgets);

var _delegator = require('./delegator');

var _delegator2 = _interopRequireDefault(_delegator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PREVIOUS_WIDGET_KEY = '__YOLK_PREVIOUS_WIDGET_KEY__';

function YolkRootComponent(child) {
  this._child = child;
}

YolkRootComponent.prototype = {
  name: 'YolkRootComponent',
  type: 'Widget',

  init: function init() {
    return this._child;
  },
  update: function update(previous, node) {
    if (this._child.key !== previous._child.key) {
      return this.init();
    }

    var patches = (0, _diff2.default)(previous._child, this._child);
    (0, _patch2.default)(node, patches);
  }
};

function render(instance, node) {
  var root = new YolkRootComponent(instance);
  var child = node.children[0];

  if (child) {
    var patches = (0, _diff2.default)(child[PREVIOUS_WIDGET_KEY], root);
    (0, _patch2.default)(child, patches);
  } else {
    child = (0, _createElement2.default)(root);
    node.appendChild(child);
    (0, _delegator2.default)(node);
    (0, _initializeWidgets2.default)(child);
  }

  child[PREVIOUS_WIDGET_KEY] = root;

  return root;
}

exports.default = YolkRootComponent;