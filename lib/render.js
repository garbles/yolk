'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.render = render;

var _batchInsertMessages = require('./batchInsertMessages');

var _NodeProxy = require('./NodeProxy');

var _is = require('./is');

var _symbol = require('./symbol');

var _types = require('./types');

function render(vnode /*: VirtualElement*/, selector /*: string*/) /*: void*/ {
  var containerProxy /*: NodeProxy*/ = _NodeProxy.NodeProxy.querySelector(selector);
  var previous /*: VirtualElement*/ = containerProxy.getAttribute(_symbol.$$root);

  if ((0, _is.isDefined)(previous)) {
    previous.destroy();
  }

  (0, _batchInsertMessages.batchInsertMessages)(function (queue) {
    vnode.initialize();
    containerProxy.replaceChild(vnode.getNodeProxy(), 0);
    queue.push(vnode);
  });

  containerProxy.setAttribute(_symbol.$$root, vnode);
} /* @flow */