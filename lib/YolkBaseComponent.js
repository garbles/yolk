'use strict';

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; })();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = create;

var _transformProperties = require('./transformProperties');

var _transformProperties2 = _interopRequireDefault(_transformProperties);

var _isFunction = require('./isFunction');

var _isFunction2 = _interopRequireDefault(_isFunction);

var _flatten = require('./flatten');

var _flatten2 = _interopRequireDefault(_flatten);

var _mountable = require('./mountable');

var _parseTag = require('./parseTag');

var _parseTag2 = _interopRequireDefault(_parseTag);

var _CompositePropSubject = require('./CompositePropSubject');

var _CompositePropSubject2 = _interopRequireDefault(_CompositePropSubject);

var _YolkBaseInnerComponent = require('./YolkBaseInnerComponent');

var _YolkBaseInnerComponent2 = _interopRequireDefault(_YolkBaseInnerComponent);

var _yolk = require('./yolk');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TAG_IS_ONLY_LETTERS = /^[a-zA-Z]*$/;

function YolkBaseComponent(tag, props, children) {
  var _props = _extends({}, props);
  var _children = children || [];

  if (_props.key) {
    this.key = _props.key.toString();
    delete _props.key;
  }

  this.name = 'YolkBaseComponent_' + tag;
  this.id = tag;
  this._props = _props;
  this._children = _children;
}

YolkBaseComponent.prototype = {
  type: 'Widget',

  init: function init() {
    this._props$ = new _CompositePropSubject2.default(this._props);
    this._children$ = new _yolk.Rx.BehaviorSubject(this._children);
    this._innerComponent = new _YolkBaseInnerComponent2.default(this.id);

    var props$ = (0, _yolk.wrapObject)(this._props$.asDistinctObservableObject(), { base: true }).map(_transformProperties2.default);
    var children$ = this._children$.flatMapLatest(function (c) {
      return (0, _yolk.wrapObject)(c, { base: true });
    }).map(_flatten2.default);
    var innerComponent = this._innerComponent;

    this._disposable = props$.combineLatest(children$).subscribe(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2);

      var props = _ref2[0];
      var children = _ref2[1];
      return innerComponent.update(props, children);
    }, function (err) {
      throw err;
    });

    return innerComponent.createVirtualNode();
  },
  postinit: function postinit(node) {
    this._innerComponent.setNode(node);
    (0, _mountable.emitMount)(node, this._props.onMount);
  },
  update: function update(previous) {
    this._props$ = previous._props$;
    this._children$ = previous._children$;
    this._disposable = previous._disposable;
    this._innerComponent = previous._innerComponent;

    this._props$.onNext(this._props);
    this._children$.onNext(this._children);
  },
  predestroy: function predestroy(node) {
    (0, _mountable.emitUnmount)(node, this._props.onUnmount);
  },
  destroy: function destroy() {
    this._disposable.dispose();

    var children = this._children;
    var length = children.length;
    var i = -1;

    while (++i < length) {
      var child = children[i];
      (0, _isFunction2.default)(child.destroy) && child.destroy();
    }
  }
};

function create(_tag, _props, children) {
  var tag = undefined;
  var props = undefined;

  if (TAG_IS_ONLY_LETTERS.test(_tag)) {
    tag = _tag;
    props = _props;
  } else {
    var parsed = (0, _parseTag2.default)(_tag);
    tag = parsed.tag;
    props = _extends({}, _props, parsed.classIds);
  }

  return new YolkBaseComponent(tag, props, children);
}

exports.default = YolkBaseComponent;