'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.render = exports.h = undefined;

var _h = require('./h');

var _render = require('./render');

function Yolk() {}
Yolk.prototype = { h: _h.h, render: _render.render };

exports.h = _h.h;
exports.render = _render.render;
exports.default = new Yolk();