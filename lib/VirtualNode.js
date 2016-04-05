'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VirtualNode = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* @flow */

var _NodeProxy = require('./NodeProxy');

var _wrapText = require('./wrapText');

var _parseTag = require('./parseTag');

var _batchInsertMessages = require('./batchInsertMessages');

var _createPatchProperties = require('./createPatchProperties');

var _createPatchChildren = require('./createPatchChildren');

var _createCompositeSubject = require('./createCompositeSubject');

var _createNodeProps = require('./createNodeProps');

var _createObservableFromArray = require('./createObservableFromArray');

var _flatten = require('./flatten');

var _symbol = require('./symbol');

var _set = require('./set');

require('rxjs/add/operator/map');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*:: import type {Observable} from 'rxjs/Observable'*/
/*:: import type {Subject} from 'rxjs/Subject'*/
/*:: import type {Subscription} from 'rxjs/Subscription'*/
/*:: import type {VirtualElement, NodeProxyDecorator} from './types'*/


var createCompositePropSubject = (0, _createCompositeSubject.createCompositeSubject)(_createNodeProps.createNodeProps);
var createCompositeArraySubject = (0, _createCompositeSubject.createCompositeSubject)(_createObservableFromArray.createObservableFromArray);

var VirtualNode = exports.VirtualNode = function () {
  function VirtualNode(tagName /*: string*/, props /*: Object*/, children /*: Array<VirtualElement>*/, key /*:: ?: string*/) {
    _classCallCheck(this, VirtualNode);

    this.key = key;
    this.tagName = tagName;
    this._props = props;
    this._children = children;
    this._subscriptions = [];
  }

  _createClass(VirtualNode, [{
    key: 'getNodeProxy',
    value: function getNodeProxy() {
      return this._nodeProxy;
    }
  }, {
    key: 'initialize',
    value: function initialize() {
      var nodeProxy /*: NodeProxy*/ = this._nodeProxy = _NodeProxy.NodeProxy.createElement(this.tagName);
      var props$ /*: Subject<Object>*/ = this._props$ = createCompositePropSubject(this._props);
      var children$ /*: Subject<Array<VirtualNode>>*/ = this._children$ = createCompositeArraySubject(this._children);

      var nodeProxyDecorator /*: NodeProxyDecorator*/ = {
        insertChild: function insertChild(child /*: VirtualNode*/, index /*: number*/) {
          return (0, _batchInsertMessages.batchInsertMessages)(function (queue) {
            child.initialize();
            nodeProxy.insertChild(child.getNodeProxy(), index);
            queue.push(child);
          });
        },
        updateChild: function updateChild(previous /*: VirtualNode*/, next /*: VirtualNode*/) {
          previous.patch(next);
        },
        moveChild: function moveChild(previous /*: VirtualNode*/, next /*: VirtualNode*/, index /*: number*/) {
          previous.patch(next);
          nodeProxy.insertChild(next.getNodeProxy(), index);
        },
        removeChild: function removeChild(child /*: VirtualNode*/) {
          child.beforeDestroy();
          nodeProxy.removeChild(child.getNodeProxy());
          child.destroy();
        }
      };

      var propSub = props$.subscribe((0, _createPatchProperties.createPatchProperties)(nodeProxy));

      var childrenSub = children$.map(_flatten.flatten).map(_wrapText.wrapText).subscribe((0, _createPatchChildren.createPatchChildren)(nodeProxyDecorator));

      this._subscriptions.push(propSub);
      this._subscriptions.push(childrenSub);
    }
  }, {
    key: 'afterInsert',
    value: function afterInsert() {
      this._nodeProxy.emitMount(this._props.onMount);
    }
  }, {
    key: 'patch',
    value: function patch(next /*: VirtualNode*/) {
      next._nodeProxy = this._nodeProxy;
      next._props$ = this._props$;
      next._children$ = this._children$;

      next._props$.next(next._props);
      next._children$.next(next._children);
    }
  }, {
    key: 'beforeDestroy',
    value: function beforeDestroy() {
      this._nodeProxy.emitUnmount(this._props.onUnmount);
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      this._subscriptions.forEach(function (s) {
        return s.unsubscribe();
      });
      this._children.forEach(function (c) {
        return c.destroy();
      });
    }
  }], [{
    key: 'create',
    value: function create(_tagName /*: string*/, props /*: Object*/, children /*: Array<VirtualNode|Observable>*/) {
      var tagName /*: string*/ = (0, _parseTag.parseTag)(_tagName, props);
      var key /*: string*/ = props.key || null;

      return new VirtualNode(tagName, props, children, key);
    }
  }]);

  return VirtualNode;
}();

(0, _set.set)(VirtualNode.prototype, _symbol.$$virtual, true);