'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = create;

var _YolkCompositeFunctionWrapper = require('./YolkCompositeFunctionWrapper');

var _YolkCompositeFunctionWrapper2 = _interopRequireDefault(_YolkCompositeFunctionWrapper);

var _CompositePropSubject = require('./CompositePropSubject');

var _CompositePropSubject2 = _interopRequireDefault(_CompositePropSubject);

var _yolk = require('./yolk');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function YolkCompositeComponent(fn, props, children) {
  var _props = _extends({}, props);
  var _children = children || [];

  if (_props.key) {
    this.key = _props.key.toString();
    delete _props.key;
  }

  this.name = 'YolkCompositeComponent_' + fn.name;
  this.id = fn.name;
  this._fn = fn;
  this._props = _props;
  this._children = _children;
  this._component = null;
}

YolkCompositeComponent.prototype = {
  type: 'Widget',

  init: function init() {
    this._props$ = new _CompositePropSubject2.default(this._props);
    this._children$ = new _yolk.Rx.BehaviorSubject(this._children);

    var props$ = this._props$.asObservableObject();
    var children$ = this._children$.asObservable();

    var fn = this._fn;
    this._component = _YolkCompositeFunctionWrapper2.default.create(fn, props$, children$);

    return this._component.vNode;
  },
  update: function update(previous) {
    this._props$ = previous._props$;
    this._children$ = previous._children$;
    this._component = previous._component;

    this._props$.onNext(this._props);
    this._children$.onNext(this._children);
  },
  destroy: function destroy() {
    _YolkCompositeFunctionWrapper2.default.destroy(this._component);

    var children = this._children;
    var length = children.length;
    var i = -1;

    while (++i < length) {
      var child = children[i];
      isFunction(child.destroy) && child.destroy();
    }
  }
};

function create(fn, props, children) {
  return new YolkCompositeComponent(fn, props, children);
}

exports.default = YolkCompositeComponent;