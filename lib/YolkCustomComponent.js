'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = create;

var _addProperties = require('./addProperties');

var _addProperties2 = _interopRequireDefault(_addProperties);

var _YolkBaseComponent = require('./YolkBaseComponent');

var _YolkBaseComponent2 = _interopRequireDefault(_YolkBaseComponent);

var _CompositePropSubject = require('./CompositePropSubject');

var _CompositePropSubject2 = _interopRequireDefault(_CompositePropSubject);

var _yolk = require('./yolk');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function YolkCustomComponent() {}

YolkCustomComponent.prototype = {
  type: 'Widget',
  onMount: function onMount() {},
  onUpdate: function onUpdate() {},
  onUnmount: function onUnmount() {},
  _initialize: function _initialize(props, children) {
    this._props = props;
    this._props$ = null;

    switch (children.length) {
      case 1:
        this._child = children[0];
        break;
      case 0:
        this._child = new _YolkBaseComponent2.default('div');
        break;
      default:
        throw new Error(this.constructor.name + ' may not have more than one child');
    }
  },
  init: function init() {
    this._props$ = new _CompositePropSubject2.default(this._props);

    return this._child;
  },
  postinit: function postinit(node) {
    var _this = this;

    var props$ = (0, _yolk.wrapObject)(this._props$.asSubjectObject(), { base: false });
    var mountDisposable = props$.take(1).subscribe(function (props) {
      return _this.onMount(props, node);
    });
    var updateDisposable = props$.skip(1).subscribe(function (props) {
      return _this.onUpdate(props, node);
    });

    this._onDestroy = function () {
      mountDisposable.dispose();
      updateDisposable.dispose();
    };
  },
  update: function update(previous) {
    this._onDestroy = previous._onDestroy;
    this._props$ = previous._props$;
    this._props$.onNext(this._props);
  },
  predestroy: function predestroy(node) {
    this.onUnmount(node);
  },
  destroy: function destroy() {
    this._onDestroy && this._onDestroy();
  }
};

YolkCustomComponent._isCustomComponent = true;

YolkCustomComponent.extend = function extend(obj) {
  function Component() {}
  (0, _addProperties2.default)(Component, YolkCustomComponent);
  Component.prototype = Object.create(YolkCustomComponent.prototype);
  (0, _addProperties2.default)(Component.prototype, obj);

  return Component;
};

function create(Tag, props, children) {
  var instance = new Tag(props, children);
  instance._initialize(props, children);

  return instance;
}

exports.default = YolkCustomComponent;