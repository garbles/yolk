"use strict";

var isThunk = require("virtual-dom/vnode/is-thunk");
var isWidget = require("virtual-dom/vnode/is-widget");
var isVNode = require("virtual-dom/vnode/is-vnode");
var isVText = require("virtual-dom/vnode/is-vtext");

module.exports = function isComponent(obj) {
  return !!obj && (isWidget(obj) || isThunk(obj) || isVNode(obj) || isVText(obj));
};