'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VirtualComponent = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* @flow */

var _cuid = require('cuid');

var _cuid2 = _interopRequireDefault(_cuid);

var _createEventHandler2 = require('./createEventHandler');

var _createComponentProps = require('./createComponentProps');

var _createCompositeSubject = require('./createCompositeSubject');

var _createObservableFromArray = require('./createObservableFromArray');

var _symbol = require('./symbol');

var _set = require('./set');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*:: import type {Observable} from 'rxjs/Observable'*/
/*:: import type {Subject} from 'rxjs/Subject'*/
/*:: import type {NodeProxy} from './NodeProxy'*/
/*:: import type {VirtualElement} from './types'*/


var createCompositeArraySubject = (0, _createCompositeSubject.createCompositeSubject)(_createObservableFromArray.createObservableFromArray);

var appendUidToComponent = function appendUidToComponent(fn /*: Function*/) /*: string*/ {
  if (!fn[_symbol.$$componentUid]) {
    fn[_symbol.$$componentUid] = (0, _cuid2.default)();
  }

  return fn[_symbol.$$componentUid];
};

var VirtualComponent = exports.VirtualComponent = function () {
  function VirtualComponent(fn /*: Function*/, tagName /*: string*/, props /*: Object*/, children /*: Array<VirtualElement>*/, key /*:: ?: string*/) {
    _classCallCheck(this, VirtualComponent);

    this.key = key;
    this.tagName = tagName;
    this._fn = fn;
    this._props = props;
    this._children = children;
    this._eventHandlers = [];
  }

  _createClass(VirtualComponent, [{
    key: 'getNodeProxy',
    value: function getNodeProxy() {
      return this._instance.getNodeProxy();
    }
  }, {
    key: 'initialize',
    value: function initialize() {
      var _this = this;

      var props = this._props$ = (0, _createComponentProps.createComponentProps)(this._props);
      var children = this._children$ = createCompositeArraySubject(this._children);

      var _createEventHandler = function _createEventHandler() {
        var handler = _createEventHandler2.createEventHandler.apply(undefined, arguments);
        _this._eventHandlers.push(handler);
        return handler;
      };

      var instance = this._instance = this._fn.call(null, { props: props.asObject(), children: children, createEventHandler: _createEventHandler });
      instance.initialize();
    }
  }, {
    key: 'afterInsert',
    value: function afterInsert() {
      this._instance.afterInsert();
    }
  }, {
    key: 'patch',
    value: function patch(next /*: VirtualComponent*/) {
      next._eventHandlers = this._eventHandlers;
      next._instance = this._instance;
      next._props$ = this._props$;
      next._children$ = this._children$;

      this._eventHandlers = [];
      this._instance = null;
      this._props$ = null;
      this._children$ = null;

      next._props$.next(next._props);
      next._children$.next(next._children);
    }
  }, {
    key: 'beforeDestroy',
    value: function beforeDestroy() {
      this._instance.beforeDestroy();
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      this._eventHandlers.forEach(function (h) {
        return !h.hasCompleted && h.complete();
      });
      this._instance.destroy();
      this._children.forEach(function (c) {
        return c.destroy();
      });
    }
  }, {
    key: 'insertChild',
    value: function insertChild(__child /*: any*/, __index /*: any*/) {}
  }, {
    key: 'moveChild',
    value: function moveChild(__child /*: any*/, __index /*: any*/) {}
  }, {
    key: 'removeChild',
    value: function removeChild(__child /*: any*/) {}
  }], [{
    key: 'create',
    value: function create(fn /*: Function*/, props /*: Object*/, children /*: Array<Observable|VirtualElement>*/) {
      var uid = appendUidToComponent(fn);

      return new VirtualComponent(fn, uid, props, children, props.key);
    }
  }]);

  return VirtualComponent;
}();

(0, _set.set)(VirtualComponent.prototype, _symbol.$$virtual, true);