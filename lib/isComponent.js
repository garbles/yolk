"use strict";

var isWidget = require("yolk-virtual-dom/vnode/is-widget");
var isVNode = require("yolk-virtual-dom/vnode/is-vnode");
var isVText = require("yolk-virtual-dom/vnode/is-vtext");

module.exports = function isComponent(obj) {
  return !!obj && (isWidget(obj) || isVNode(obj) || isVText(obj));
};