'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.h = h;

var _VirtualComponent = require('./VirtualComponent');

var _VirtualNode = require('./VirtualNode');

var _is = require('./is');

var _flatten = require('./flatten');

var _emptyObject = require('./emptyObject');

/*:: import type {VirtualElement} from './types'*/ /* @flow weak */

function h(tagName, _props) /*: VirtualElement*/ {
  for (var _len = arguments.length, _children = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    _children[_key - 2] = arguments[_key];
  }

  var children = (0, _flatten.flatten)(_children);
  var props = _props || _emptyObject.emptyObject;

  if ((0, _is.isString)(tagName)) {
    return _VirtualNode.VirtualNode.create(tagName, props, children);
  }

  return _VirtualComponent.VirtualComponent.create(tagName, props, children);
}