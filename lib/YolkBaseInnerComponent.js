'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _h = require('yolk-virtual-dom/h');

var _h2 = _interopRequireDefault(_h);

var _diff = require('yolk-virtual-dom/diff');

var _diff2 = _interopRequireDefault(_diff);

var _patch = require('yolk-virtual-dom/patch');

var _patch2 = _interopRequireDefault(_patch);

var _generateUid = require('./generateUid');

var _generateUid2 = _interopRequireDefault(_generateUid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function YolkBaseInnerComponent(tag) {
  this._tag = tag;
  this._props = {};
  this._children = [];
  this._uid = (0, _generateUid2.default)();
  this._vNode = null;
  this._node = null;
}

YolkBaseInnerComponent.prototype = {
  createVirtualNode: function createVirtualNode() {
    this._vNode = (0, _h2.default)(this._tag, this._props, this._children);
    return this._vNode;
  },
  setNode: function setNode(node) {
    this._node = node;
    this.update(this._props, this._children);
  },
  update: function update(props, children) {
    this._props = props;
    this._children = children;

    if (this._node) {
      var vNode = (0, _h2.default)(this._tag, props, children);
      var patches = (0, _diff2.default)(this._vNode, vNode);

      this._vNode = vNode;
      (0, _patch2.default)(this._node, patches);
    }
  }
};

exports.default = YolkBaseInnerComponent;