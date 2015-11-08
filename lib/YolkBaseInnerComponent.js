"use strict";

var h = require("yolk-virtual-dom/h");
var create = require("yolk-virtual-dom/create-element");
var diff = require("yolk-virtual-dom/diff");
var patch = require("yolk-virtual-dom/patch");
var generateUid = require("./generateUid");

function YolkBaseInnerComponent(tag) {
  this._tag = tag;
  this._props = {};
  this._children = [];
  this._uid = generateUid();
  this._vNode = null;
  this._node = null;
}

YolkBaseInnerComponent.prototype = {
  createNode: function createNode() {
    this._vNode = h(this._tag, this._props, this._children);
    this._node = create(this._vNode);
    return this._node;
  },

  update: function update(props, children) {
    this._props = props;
    this._children = children;

    if (this._node) {
      var vNode = h(this._tag, props, children);
      var patches = diff(this._vNode, vNode);

      this._vNode = vNode;
      patch(this._node, patches);
    }
  }
};

module.exports = YolkBaseInnerComponent;