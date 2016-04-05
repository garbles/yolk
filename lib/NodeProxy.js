'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NodeProxy = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* @flow */

var _document = require('global/document');

var _document2 = _interopRequireDefault(_document);

var _propertyDescriptors = require('./propertyDescriptors');

var _eventDelegator = require('./eventDelegator');

var _mountable = require('./mountable');

var _is = require('./is');

var _get = require('./get');

var _set = require('./set');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NodeProxy = exports.NodeProxy = function () {
  function NodeProxy(node /*: HTMLElement*/) {
    _classCallCheck(this, NodeProxy);

    this._node = node;
  }

  _createClass(NodeProxy, [{
    key: 'emitMount',
    value: function emitMount(fn /*: Function*/) {
      (0, _mountable.emitMount)(this._node, fn);
    }
  }, {
    key: 'emitUnmount',
    value: function emitUnmount(fn /*: Function*/) {
      (0, _mountable.emitUnmount)(this._node, fn);
    }
  }, {
    key: 'children',
    value: function children() {
      return this._node.children;
    }
  }, {
    key: 'replaceChild',
    value: function replaceChild(childProxy /*: NodeProxy*/, index /*: number*/) {
      var node = this._node;
      var child = childProxy._node;
      var replaced = node.children[index];

      if ((0, _is.isDefined)(replaced)) {
        node.replaceChild(child, replaced);
      } else {
        node.appendChild(child);
      }
    }
  }, {
    key: 'insertChild',
    value: function insertChild(childProxy /*: NodeProxy*/, index /*: number*/) {
      var node = this._node;
      var child = childProxy._node;
      var before /*: Node*/ = node.children[index];

      if ((0, _is.isDefined)(before)) {
        node.insertBefore(child, before);
      } else {
        node.appendChild(child);
      }
    }
  }, {
    key: 'removeChild',
    value: function removeChild(childProxy /*: NodeProxy*/) {
      var node = this._node;
      var child = childProxy._node;
      node.removeChild(child);
    }
  }, {
    key: 'getAttribute',
    value: function getAttribute(key /*: string*/) {
      var node = this._node;
      var descriptor = (0, _get.get)(_propertyDescriptors.descriptors, key);

      if (!descriptor) {
        return (0, _get.get)(node, key);
      }

      if (descriptor.useEqualSetter) {
        return (0, _get.get)(node, descriptor.computed);
      }

      return node.getAttribute(descriptor.computed);
    }
  }, {
    key: 'setAttribute',
    value: function setAttribute(key /*: string*/, value /*: any*/) {
      var node = this._node;
      var descriptor = (0, _get.get)(_propertyDescriptors.descriptors, key);

      if (!descriptor) {
        (0, _set.set)(node, key, value);
        return;
      }

      var computed = descriptor.computed;


      if (descriptor.useEqualSetter) {
        (0, _set.set)(node, computed, value);
        return;
      }

      if (descriptor.hasBooleanValue && !value) {
        node.removeAttribute(computed);
        return;
      }

      if (descriptor.useEventListener) {
        (0, _eventDelegator.addEventListener)(node, computed, value);
        return;
      }

      node.setAttribute(computed, value);
    }
  }, {
    key: 'removeAttribute',
    value: function removeAttribute(key /*: string*/) {
      var node = this._node;
      var descriptor = (0, _get.get)(_propertyDescriptors.descriptors, key);

      if (!descriptor) {
        (0, _set.set)(node, key, undefined);
        return;
      }

      var computed = descriptor.computed;


      if (descriptor.useSetAttribute) {
        node.removeAttribute(computed);
        return;
      }

      if (descriptor.hasBooleanValue) {
        (0, _set.set)(node, computed, false);
        return;
      }

      if (descriptor.useEventListener) {
        (0, _eventDelegator.removeEventListener)(node, computed);
        return;
      }

      (0, _set.set)(node, computed, undefined);
    }
  }], [{
    key: 'createElement',
    value: function createElement(tagName /*: string*/) {
      var node /*: HTMLElement*/ = _document2.default.createElement(tagName);
      return new NodeProxy(node);
    }
  }, {
    key: 'querySelector',
    value: function querySelector(selector /*: string*/) {
      var node /*: HTMLElement*/ = _document2.default.querySelector(selector);
      return new NodeProxy(node);
    }
  }]);

  return NodeProxy;
}();