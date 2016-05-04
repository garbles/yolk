(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("Rx"));
	else if(typeof define === 'function' && define.amd)
		define(["Rx"], factory);
	else if(typeof exports === 'object')
		exports["Yolk"] = factory(require("Rx"));
	else
		root["Yolk"] = factory(root["Rx"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_5__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.render = exports.h = undefined;

	var _h = __webpack_require__(1);

	var _render = __webpack_require__(95);

	function Yolk() {}
	Yolk.prototype = { h: _h.h, render: _render.render };

	exports.h = _h.h;
	exports.render = _render.render;
	exports.default = new Yolk();

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.h = h;

	var _VirtualComponent = __webpack_require__(2);

	var _VirtualElement = __webpack_require__(58);

	var _is = __webpack_require__(6);

	var _flatten = __webpack_require__(93);

	var _emptyObject = __webpack_require__(94);

	/*:: import type {VirtualNode} from './types'*/ /* @flow weak */

	function h(tagName, _props) /*: VirtualNode*/ {
	  for (var _len = arguments.length, _children = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
	    _children[_key - 2] = arguments[_key];
	  }

	  var children = (0, _flatten.flatten)(_children);
	  var props = _props || _emptyObject.emptyObject;

	  if ((0, _is.isString)(tagName)) {
	    return _VirtualElement.VirtualElement.create(tagName, props, children);
	  }

	  return _VirtualComponent.VirtualComponent.create(tagName, props, children);
	}

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.VirtualComponent = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* @flow */

	var _cuid = __webpack_require__(3);

	var _cuid2 = _interopRequireDefault(_cuid);

	var _createEventHandler2 = __webpack_require__(4);

	var _createComponentProps = __webpack_require__(35);

	var _createCompositeSubject = __webpack_require__(39);

	var _createObservableFromArray = __webpack_require__(47);

	var _symbol = __webpack_require__(7);

	var _set = __webpack_require__(57);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/*:: import type {Observable} from 'rxjs/Observable'*/
	/*:: import type {Subject} from 'rxjs/Subject'*/
	/*:: import type {ElementProxy} from './ElementProxy'*/
	/*:: import type {VirtualNode} from './types'*/


	var createCompositeArraySubject = (0, _createCompositeSubject.createCompositeSubject)(_createObservableFromArray.createObservableFromArray);

	var appendUidToComponent = function appendUidToComponent(fn /*: Function*/) /*: string*/ {
	  if (!fn[_symbol.$$componentUid]) {
	    fn[_symbol.$$componentUid] = (0, _cuid2.default)();
	  }

	  return fn[_symbol.$$componentUid];
	};

	var VirtualComponent = exports.VirtualComponent = function () {
	  function VirtualComponent(fn /*: Function*/, tagName /*: string*/, props /*: Object*/, children /*: Array<VirtualNode>*/, key /*:: ?: string*/) {
	    _classCallCheck(this, VirtualComponent);

	    this.key = key;
	    this.tagName = tagName;
	    this._fn = fn;
	    this._props = props;
	    this._children = children;
	    this._eventHandlers = [];
	  }

	  _createClass(VirtualComponent, [{
	    key: 'getProxy',
	    value: function getProxy() {
	      return this._instance.getProxy();
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
	    value: function create(fn /*: Function*/, props /*: Object*/, children /*: Array<Observable|VirtualNode>*/) {
	      var uid = appendUidToComponent(fn);

	      return new VirtualComponent(fn, uid, props, children, props.key);
	    }
	  }]);

	  return VirtualComponent;
	}();

	(0, _set.set)(VirtualComponent.prototype, _symbol.$$virtual, true);

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * cuid.js
	 * Collision-resistant UID generator for browsers and node.
	 * Sequential for fast db lookups and recency sorting.
	 * Safe for element IDs and server-side lookups.
	 *
	 * Extracted from CLCTR
	 *
	 * Copyright (c) Eric Elliott 2012
	 * MIT License
	 */

	/*global window, navigator, document, require, process, module */
	(function (app) {
	  'use strict';
	  var namespace = 'cuid',
	    c = 0,
	    blockSize = 4,
	    base = 36,
	    discreteValues = Math.pow(base, blockSize),

	    pad = function pad(num, size) {
	      var s = "000000000" + num;
	      return s.substr(s.length-size);
	    },

	    randomBlock = function randomBlock() {
	      return pad((Math.random() *
	            discreteValues << 0)
	            .toString(base), blockSize);
	    },

	    safeCounter = function () {
	      c = (c < discreteValues) ? c : 0;
	      c++; // this is not subliminal
	      return c - 1;
	    },

	    api = function cuid() {
	      // Starting with a lowercase letter makes
	      // it HTML element ID friendly.
	      var letter = 'c', // hard-coded allows for sequential access

	        // timestamp
	        // warning: this exposes the exact date and time
	        // that the uid was created.
	        timestamp = (new Date().getTime()).toString(base),

	        // Prevent same-machine collisions.
	        counter,

	        // A few chars to generate distinct ids for different
	        // clients (so different computers are far less
	        // likely to generate the same id)
	        fingerprint = api.fingerprint(),

	        // Grab some more chars from Math.random()
	        random = randomBlock() + randomBlock();

	        counter = pad(safeCounter().toString(base), blockSize);

	      return  (letter + timestamp + counter + fingerprint + random);
	    };

	  api.slug = function slug() {
	    var date = new Date().getTime().toString(36),
	      counter,
	      print = api.fingerprint().slice(0,1) +
	        api.fingerprint().slice(-1),
	      random = randomBlock().slice(-2);

	      counter = safeCounter().toString(36).slice(-4);

	    return date.slice(-2) +
	      counter + print + random;
	  };

	  api.globalCount = function globalCount() {
	    // We want to cache the results of this
	    var cache = (function calc() {
	        var i,
	          count = 0;

	        for (i in window) {
	          count++;
	        }

	        return count;
	      }());

	    api.globalCount = function () { return cache; };
	    return cache;
	  };

	  api.fingerprint = function browserPrint() {
	    return pad((navigator.mimeTypes.length +
	      navigator.userAgent.length).toString(36) +
	      api.globalCount().toString(36), 4);
	  };

	  // don't change anything from here down.
	  if (app.register) {
	    app.register(namespace, api);
	  } else if (true) {
	    module.exports = api;
	  } else {
	    app[namespace] = api;
	  }

	}(this.applitude || this));


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.createEventHandler = createEventHandler;

	var _Observable = __webpack_require__(5);

	var _Observer = __webpack_require__(5);

	var _Subject = __webpack_require__(5);

	var _Subscription = __webpack_require__(5);

	var _is = __webpack_require__(6);

	__webpack_require__(8);

	__webpack_require__(25);

	__webpack_require__(27);

	/* @flow */

	function wrapMapFn(obs /*: Subject*/, mapFn /*:: ?: any*/) /*: Observable*/ {
	  var mapFnIsDefined /*: boolean*/ = (0, _is.isDefined)(mapFn);
	  var mapFnIsFunction /*: boolean*/ = (0, _is.isFunction)(mapFn);

	  if (mapFnIsDefined && mapFnIsFunction) {
	    return obs.map(mapFn);
	  } else if (mapFnIsDefined) {
	    return obs.mapTo(mapFn);
	  }

	  return obs;
	}

	function createEventHandler(mapFn /*:: ?: any*/, init /*:: ?: any*/) /*: Subject*/ {
	  var subject /*: Subject*/ = new _Subject.Subject();

	  var observable /*: Observable*/ = _Observable.Observable.create(function (observer /*: Observer*/) /*: Function*/ {
	    var subscription /*: Subscription*/ = wrapMapFn(subject, mapFn).subscribe(observer);

	    if ((0, _is.isDefined)(init)) {
	      observer.next(init);
	    }

	    return function () {
	      subscription.unsubscribe();
	    };
	  });

	  return _Subject.Subject.create(subject, observable.share());
	}

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_5__;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.isDefined = isDefined;
	exports.isEmptyObject = isEmptyObject;
	exports.isFunction = isFunction;
	exports.isNumber = isNumber;
	exports.isString = isString;
	exports.isSubject = isSubject;
	exports.isVirtual = isVirtual;

	var _Subject = __webpack_require__(5);

	var _symbol = __webpack_require__(7);

	/* @flow */

	function isDefined(obj /*: any*/) /*: boolean*/ {
	  return typeof obj !== 'undefined';
	}

	function isEmptyObject(obj /*: any*/) /*: boolean*/ {
	  return Object.keys(obj).length === 0;
	}

	function isFunction(obj /*: any*/) /*: boolean*/ {
	  return Object.prototype.toString.call(obj) === '[object Function]';
	}

	function isNumber(obj /*: any*/) /*: boolean*/ {
	  return typeof obj === 'number';
	}

	function isString(obj /*: any*/) /*: boolean*/ {
	  return typeof obj === 'string';
	}

	function isSubject(obj /*: any*/) /*: boolean*/ {
	  return obj instanceof _Subject.Subject;
	}

	function isVirtual(obj /*: any*/) /*: boolean*/ {
	  return !!obj && obj[_symbol.$$virtual];
	}

/***/ },
/* 7 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var _Symbol = global.Symbol;

	var symbols = {
	  $$virtual: "@@YOLK_VIRTUAL",
	  $$componentUid: "@@YOLK_COMPONENT_UID",
	  $$root: "@@YOLK_ROOT"
	};

	if (typeof _Symbol === "function") {
	  if (typeof _Symbol.for === "function") {
	    Object.keys(symbols).forEach(function (key) {
	      symbols[key] = _Symbol.for(symbols[key]);
	    });
	  } else {
	    Object.keys(symbols).forEach(function (key) {
	      symbols[key] = _Symbol(symbols[key]);
	    });
	  }
	}

	var $$virtual = symbols.$$virtual;
	var $$componentUid = symbols.$$componentUid;
	var $$root = symbols.$$root;
	exports.$$virtual = $$virtual;
	exports.$$componentUid = $$componentUid;
	exports.$$root = $$root;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Observable_1 = __webpack_require__(9);
	var map_1 = __webpack_require__(24);
	Observable_1.Observable.prototype.map = map_1.map;
	//# sourceMappingURL=map.js.map

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var root_1 = __webpack_require__(10);
	var observable_1 = __webpack_require__(12);
	var toSubscriber_1 = __webpack_require__(13);
	/**
	 * A representation of any set of values over any amount of time. This the most basic building block
	 * of RxJS.
	 *
	 * @class Observable<T>
	 */
	var Observable = (function () {
	    /**
	     * @constructor
	     * @param {Function} subscribe the function that is  called when the Observable is
	     * initially subscribed to. This function is given a Subscriber, to which new values
	     * can be `next`ed, or an `error` method can be called to raise an error, or
	     * `complete` can be called to notify of a successful completion.
	     */
	    function Observable(subscribe) {
	        this._isScalar = false;
	        if (subscribe) {
	            this._subscribe = subscribe;
	        }
	    }
	    /**
	     * Creates a new Observable, with this Observable as the source, and the passed
	     * operator defined as the new observable's operator.
	     * @method lift
	     * @param {Operator} operator the operator defining the operation to take on the observable
	     * @return {Observable} a new observable with the Operator applied
	     */
	    Observable.prototype.lift = function (operator) {
	        var observable = new Observable();
	        observable.source = this;
	        observable.operator = operator;
	        return observable;
	    };
	    /**
	     * Registers handlers for handling emitted values, error and completions from the observable, and
	     *  executes the observable's subscriber function, which will take action to set up the underlying data stream
	     * @method subscribe
	     * @param {PartialObserver|Function} observerOrNext (optional) either an observer defining all functions to be called,
	     *  or the first of three possible handlers, which is the handler for each value emitted from the observable.
	     * @param {Function} error (optional) a handler for a terminal event resulting from an error. If no error handler is provided,
	     *  the error will be thrown as unhandled
	     * @param {Function} complete (optional) a handler for a terminal event resulting from successful completion.
	     * @return {ISubscription} a subscription reference to the registered handlers
	     */
	    Observable.prototype.subscribe = function (observerOrNext, error, complete) {
	        var operator = this.operator;
	        var sink = toSubscriber_1.toSubscriber(observerOrNext, error, complete);
	        sink.add(operator ? operator.call(sink, this) : this._subscribe(sink));
	        if (sink.syncErrorThrowable) {
	            sink.syncErrorThrowable = false;
	            if (sink.syncErrorThrown) {
	                throw sink.syncErrorValue;
	            }
	        }
	        return sink;
	    };
	    /**
	     * @method forEach
	     * @param {Function} next a handler for each value emitted by the observable
	     * @param {PromiseConstructor} [PromiseCtor] a constructor function used to instantiate the Promise
	     * @return {Promise} a promise that either resolves on observable completion or
	     *  rejects with the handled error
	     */
	    Observable.prototype.forEach = function (next, PromiseCtor) {
	        var _this = this;
	        if (!PromiseCtor) {
	            if (root_1.root.Rx && root_1.root.Rx.config && root_1.root.Rx.config.Promise) {
	                PromiseCtor = root_1.root.Rx.config.Promise;
	            }
	            else if (root_1.root.Promise) {
	                PromiseCtor = root_1.root.Promise;
	            }
	        }
	        if (!PromiseCtor) {
	            throw new Error('no Promise impl found');
	        }
	        return new PromiseCtor(function (resolve, reject) {
	            var subscription = _this.subscribe(function (value) {
	                if (subscription) {
	                    // if there is a subscription, then we can surmise
	                    // the next handling is asynchronous. Any errors thrown
	                    // need to be rejected explicitly and unsubscribe must be
	                    // called manually
	                    try {
	                        next(value);
	                    }
	                    catch (err) {
	                        reject(err);
	                        subscription.unsubscribe();
	                    }
	                }
	                else {
	                    // if there is NO subscription, then we're getting a nexted
	                    // value synchronously during subscription. We can just call it.
	                    // If it errors, Observable's `subscribe` imple will ensure the
	                    // unsubscription logic is called, then synchronously rethrow the error.
	                    // After that, Promise will trap the error and send it
	                    // down the rejection path.
	                    next(value);
	                }
	            }, reject, resolve);
	        });
	    };
	    Observable.prototype._subscribe = function (subscriber) {
	        return this.source.subscribe(subscriber);
	    };
	    /**
	     * An interop point defined by the es7-observable spec https://github.com/zenparsing/es-observable
	     * @method Symbol.observable
	     * @return {Observable} this instance of the observable
	     */
	    Observable.prototype[observable_1.$$observable] = function () {
	        return this;
	    };
	    // HACK: Since TypeScript inherits static properties too, we have to
	    // fight against TypeScript here so Subject can have a different static create signature
	    /**
	     * Creates a new cold Observable by calling the Observable constructor
	     * @static true
	     * @owner Observable
	     * @method create
	     * @param {Function} subscribe? the subscriber function to be passed to the Observable constructor
	     * @return {Observable} a new cold observable
	     */
	    Observable.create = function (subscribe) {
	        return new Observable(subscribe);
	    };
	    return Observable;
	}());
	exports.Observable = Observable;
	//# sourceMappingURL=Observable.js.map

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module, global) {"use strict";
	var objectTypes = {
	    'boolean': false,
	    'function': true,
	    'object': true,
	    'number': false,
	    'string': false,
	    'undefined': false
	};
	exports.root = (objectTypes[typeof self] && self) || (objectTypes[typeof window] && window);
	/* tslint:disable:no-unused-variable */
	var freeExports = objectTypes[typeof exports] && exports && !exports.nodeType && exports;
	var freeModule = objectTypes[typeof module] && module && !module.nodeType && module;
	var freeGlobal = objectTypes[typeof global] && global;
	if (freeGlobal && (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal)) {
	    exports.root = freeGlobal;
	}
	//# sourceMappingURL=root.js.map
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(11)(module), (function() { return this; }())))

/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var root_1 = __webpack_require__(10);
	var Symbol = root_1.root.Symbol;
	if (typeof Symbol === 'function') {
	    if (Symbol.observable) {
	        exports.$$observable = Symbol.observable;
	    }
	    else {
	        if (typeof Symbol.for === 'function') {
	            exports.$$observable = Symbol.for('observable');
	        }
	        else {
	            exports.$$observable = Symbol('observable');
	        }
	        Symbol.observable = exports.$$observable;
	    }
	}
	else {
	    exports.$$observable = '@@observable';
	}
	//# sourceMappingURL=observable.js.map

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Subscriber_1 = __webpack_require__(14);
	var rxSubscriber_1 = __webpack_require__(22);
	function toSubscriber(nextOrObserver, error, complete) {
	    if (nextOrObserver && typeof nextOrObserver === 'object') {
	        if (nextOrObserver instanceof Subscriber_1.Subscriber) {
	            return nextOrObserver;
	        }
	        else if (typeof nextOrObserver[rxSubscriber_1.$$rxSubscriber] === 'function') {
	            return nextOrObserver[rxSubscriber_1.$$rxSubscriber]();
	        }
	    }
	    return new Subscriber_1.Subscriber(nextOrObserver, error, complete);
	}
	exports.toSubscriber = toSubscriber;
	//# sourceMappingURL=toSubscriber.js.map

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var isFunction_1 = __webpack_require__(15);
	var Subscription_1 = __webpack_require__(16);
	var rxSubscriber_1 = __webpack_require__(22);
	var Observer_1 = __webpack_require__(23);
	/**
	 * Implements the {@link Observer} interface and extends the
	 * {@link Subscription} class. While the {@link Observer} is the public API for
	 * consuming the values of an {@link Observable}, all Observers get converted to
	 * a Subscriber, in order to provide Subscription-like capabilities such as
	 * `unsubscribe`. Subscriber is a common type in RxJS, and crucial for
	 * implementing operators, but it is rarely used as a public API.
	 *
	 * @class Subscriber<T>
	 */
	var Subscriber = (function (_super) {
	    __extends(Subscriber, _super);
	    /**
	     * @param {Observer|function(value: T): void} [destinationOrNext] A partially
	     * defined Observer or a `next` callback function.
	     * @param {function(e: ?any): void} [error] The `error` callback of an
	     * Observer.
	     * @param {function(): void} [complete] The `complete` callback of an
	     * Observer.
	     */
	    function Subscriber(destinationOrNext, error, complete) {
	        _super.call(this);
	        this.syncErrorValue = null;
	        this.syncErrorThrown = false;
	        this.syncErrorThrowable = false;
	        this.isStopped = false;
	        switch (arguments.length) {
	            case 0:
	                this.destination = Observer_1.empty;
	                break;
	            case 1:
	                if (!destinationOrNext) {
	                    this.destination = Observer_1.empty;
	                    break;
	                }
	                if (typeof destinationOrNext === 'object') {
	                    if (destinationOrNext instanceof Subscriber) {
	                        this.destination = destinationOrNext;
	                        this.destination.add(this);
	                    }
	                    else {
	                        this.syncErrorThrowable = true;
	                        this.destination = new SafeSubscriber(this, destinationOrNext);
	                    }
	                    break;
	                }
	            default:
	                this.syncErrorThrowable = true;
	                this.destination = new SafeSubscriber(this, destinationOrNext, error, complete);
	                break;
	        }
	    }
	    /**
	     * A static factory for a Subscriber, given a (potentially partial) definition
	     * of an Observer.
	     * @param {function(x: ?T): void} [next] The `next` callback of an Observer.
	     * @param {function(e: ?any): void} [error] The `error` callback of an
	     * Observer.
	     * @param {function(): void} [complete] The `complete` callback of an
	     * Observer.
	     * @return {Subscriber<T>} A Subscriber wrapping the (partially defined)
	     * Observer represented by the given arguments.
	     */
	    Subscriber.create = function (next, error, complete) {
	        var subscriber = new Subscriber(next, error, complete);
	        subscriber.syncErrorThrowable = false;
	        return subscriber;
	    };
	    /**
	     * The {@link Observer} callback to receive notifications of type `next` from
	     * the Observable, with a value. The Observable may call this method 0 or more
	     * times.
	     * @param {T} [value] The `next` value.
	     * @return {void}
	     */
	    Subscriber.prototype.next = function (value) {
	        if (!this.isStopped) {
	            this._next(value);
	        }
	    };
	    /**
	     * The {@link Observer} callback to receive notifications of type `error` from
	     * the Observable, with an attached {@link Error}. Notifies the Observer that
	     * the Observable has experienced an error condition.
	     * @param {any} [err] The `error` exception.
	     * @return {void}
	     */
	    Subscriber.prototype.error = function (err) {
	        if (!this.isStopped) {
	            this.isStopped = true;
	            this._error(err);
	        }
	    };
	    /**
	     * The {@link Observer} callback to receive a valueless notification of type
	     * `complete` from the Observable. Notifies the Observer that the Observable
	     * has finished sending push-based notifications.
	     * @return {void}
	     */
	    Subscriber.prototype.complete = function () {
	        if (!this.isStopped) {
	            this.isStopped = true;
	            this._complete();
	        }
	    };
	    Subscriber.prototype.unsubscribe = function () {
	        if (this.isUnsubscribed) {
	            return;
	        }
	        this.isStopped = true;
	        _super.prototype.unsubscribe.call(this);
	    };
	    Subscriber.prototype._next = function (value) {
	        this.destination.next(value);
	    };
	    Subscriber.prototype._error = function (err) {
	        this.destination.error(err);
	        this.unsubscribe();
	    };
	    Subscriber.prototype._complete = function () {
	        this.destination.complete();
	        this.unsubscribe();
	    };
	    Subscriber.prototype[rxSubscriber_1.$$rxSubscriber] = function () {
	        return this;
	    };
	    return Subscriber;
	}(Subscription_1.Subscription));
	exports.Subscriber = Subscriber;
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var SafeSubscriber = (function (_super) {
	    __extends(SafeSubscriber, _super);
	    function SafeSubscriber(_parent, observerOrNext, error, complete) {
	        _super.call(this);
	        this._parent = _parent;
	        var next;
	        var context = this;
	        if (isFunction_1.isFunction(observerOrNext)) {
	            next = observerOrNext;
	        }
	        else if (observerOrNext) {
	            context = observerOrNext;
	            next = observerOrNext.next;
	            error = observerOrNext.error;
	            complete = observerOrNext.complete;
	            if (isFunction_1.isFunction(context.unsubscribe)) {
	                this.add(context.unsubscribe.bind(context));
	            }
	            context.unsubscribe = this.unsubscribe.bind(this);
	        }
	        this._context = context;
	        this._next = next;
	        this._error = error;
	        this._complete = complete;
	    }
	    SafeSubscriber.prototype.next = function (value) {
	        if (!this.isStopped && this._next) {
	            var _parent = this._parent;
	            if (!_parent.syncErrorThrowable) {
	                this.__tryOrUnsub(this._next, value);
	            }
	            else if (this.__tryOrSetError(_parent, this._next, value)) {
	                this.unsubscribe();
	            }
	        }
	    };
	    SafeSubscriber.prototype.error = function (err) {
	        if (!this.isStopped) {
	            var _parent = this._parent;
	            if (this._error) {
	                if (!_parent.syncErrorThrowable) {
	                    this.__tryOrUnsub(this._error, err);
	                    this.unsubscribe();
	                }
	                else {
	                    this.__tryOrSetError(_parent, this._error, err);
	                    this.unsubscribe();
	                }
	            }
	            else if (!_parent.syncErrorThrowable) {
	                this.unsubscribe();
	                throw err;
	            }
	            else {
	                _parent.syncErrorValue = err;
	                _parent.syncErrorThrown = true;
	                this.unsubscribe();
	            }
	        }
	    };
	    SafeSubscriber.prototype.complete = function () {
	        if (!this.isStopped) {
	            var _parent = this._parent;
	            if (this._complete) {
	                if (!_parent.syncErrorThrowable) {
	                    this.__tryOrUnsub(this._complete);
	                    this.unsubscribe();
	                }
	                else {
	                    this.__tryOrSetError(_parent, this._complete);
	                    this.unsubscribe();
	                }
	            }
	            else {
	                this.unsubscribe();
	            }
	        }
	    };
	    SafeSubscriber.prototype.__tryOrUnsub = function (fn, value) {
	        try {
	            fn.call(this._context, value);
	        }
	        catch (err) {
	            this.unsubscribe();
	            throw err;
	        }
	    };
	    SafeSubscriber.prototype.__tryOrSetError = function (parent, fn, value) {
	        try {
	            fn.call(this._context, value);
	        }
	        catch (err) {
	            parent.syncErrorValue = err;
	            parent.syncErrorThrown = true;
	            return true;
	        }
	        return false;
	    };
	    SafeSubscriber.prototype._unsubscribe = function () {
	        var _parent = this._parent;
	        this._context = null;
	        this._parent = null;
	        _parent.unsubscribe();
	    };
	    return SafeSubscriber;
	}(Subscriber));
	//# sourceMappingURL=Subscriber.js.map

/***/ },
/* 15 */
/***/ function(module, exports) {

	"use strict";
	function isFunction(x) {
	    return typeof x === 'function';
	}
	exports.isFunction = isFunction;
	//# sourceMappingURL=isFunction.js.map

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var isArray_1 = __webpack_require__(17);
	var isObject_1 = __webpack_require__(18);
	var isFunction_1 = __webpack_require__(15);
	var tryCatch_1 = __webpack_require__(19);
	var errorObject_1 = __webpack_require__(20);
	var UnsubscriptionError_1 = __webpack_require__(21);
	/**
	 * Represents a disposable resource, such as the execution of an Observable. A
	 * Subscription has one important method, `unsubscribe`, that takes no argument
	 * and just disposes the resource held by the subscription.
	 *
	 * Additionally, subscriptions may be grouped together through the `add()`
	 * method, which will attach a child Subscription to the current Subscription.
	 * When a Subscription is unsubscribed, all its children (and its grandchildren)
	 * will be unsubscribed as well.
	 *
	 * @class Subscription
	 */
	var Subscription = (function () {
	    /**
	     * @param {function(): void} [unsubscribe] A function describing how to
	     * perform the disposal of resources when the `unsubscribe` method is called.
	     */
	    function Subscription(unsubscribe) {
	        /**
	         * A flag to indicate whether this Subscription has already been unsubscribed.
	         * @type {boolean}
	         */
	        this.isUnsubscribed = false;
	        if (unsubscribe) {
	            this._unsubscribe = unsubscribe;
	        }
	    }
	    /**
	     * Disposes the resources held by the subscription. May, for instance, cancel
	     * an ongoing Observable execution or cancel any other type of work that
	     * started when the Subscription was created.
	     * @return {void}
	     */
	    Subscription.prototype.unsubscribe = function () {
	        var hasErrors = false;
	        var errors;
	        if (this.isUnsubscribed) {
	            return;
	        }
	        this.isUnsubscribed = true;
	        var _a = this, _unsubscribe = _a._unsubscribe, _subscriptions = _a._subscriptions;
	        this._subscriptions = null;
	        if (isFunction_1.isFunction(_unsubscribe)) {
	            var trial = tryCatch_1.tryCatch(_unsubscribe).call(this);
	            if (trial === errorObject_1.errorObject) {
	                hasErrors = true;
	                (errors = errors || []).push(errorObject_1.errorObject.e);
	            }
	        }
	        if (isArray_1.isArray(_subscriptions)) {
	            var index = -1;
	            var len = _subscriptions.length;
	            while (++index < len) {
	                var sub = _subscriptions[index];
	                if (isObject_1.isObject(sub)) {
	                    var trial = tryCatch_1.tryCatch(sub.unsubscribe).call(sub);
	                    if (trial === errorObject_1.errorObject) {
	                        hasErrors = true;
	                        errors = errors || [];
	                        var err = errorObject_1.errorObject.e;
	                        if (err instanceof UnsubscriptionError_1.UnsubscriptionError) {
	                            errors = errors.concat(err.errors);
	                        }
	                        else {
	                            errors.push(err);
	                        }
	                    }
	                }
	            }
	        }
	        if (hasErrors) {
	            throw new UnsubscriptionError_1.UnsubscriptionError(errors);
	        }
	    };
	    /**
	     * Adds a tear down to be called during the unsubscribe() of this
	     * Subscription.
	     *
	     * If the tear down being added is a subscription that is already
	     * unsubscribed, is the same reference `add` is being called on, or is
	     * `Subscription.EMPTY`, it will not be added.
	     *
	     * If this subscription is already in an `isUnsubscribed` state, the passed
	     * tear down logic will be executed immediately.
	     *
	     * @param {TeardownLogic} teardown The additional logic to execute on
	     * teardown.
	     * @return {Subscription} Returns the Subscription used or created to be
	     * added to the inner subscriptions list. This Subscription can be used with
	     * `remove()` to remove the passed teardown logic from the inner subscriptions
	     * list.
	     */
	    Subscription.prototype.add = function (teardown) {
	        if (!teardown || (teardown === this) || (teardown === Subscription.EMPTY)) {
	            return;
	        }
	        var sub = teardown;
	        switch (typeof teardown) {
	            case 'function':
	                sub = new Subscription(teardown);
	            case 'object':
	                if (sub.isUnsubscribed || typeof sub.unsubscribe !== 'function') {
	                    break;
	                }
	                else if (this.isUnsubscribed) {
	                    sub.unsubscribe();
	                }
	                else {
	                    (this._subscriptions || (this._subscriptions = [])).push(sub);
	                }
	                break;
	            default:
	                throw new Error('Unrecognized teardown ' + teardown + ' added to Subscription.');
	        }
	        return sub;
	    };
	    /**
	     * Removes a Subscription from the internal list of subscriptions that will
	     * unsubscribe during the unsubscribe process of this Subscription.
	     * @param {Subscription} subscription The subscription to remove.
	     * @return {void}
	     */
	    Subscription.prototype.remove = function (subscription) {
	        // HACK: This might be redundant because of the logic in `add()`
	        if (subscription == null || (subscription === this) || (subscription === Subscription.EMPTY)) {
	            return;
	        }
	        var subscriptions = this._subscriptions;
	        if (subscriptions) {
	            var subscriptionIndex = subscriptions.indexOf(subscription);
	            if (subscriptionIndex !== -1) {
	                subscriptions.splice(subscriptionIndex, 1);
	            }
	        }
	    };
	    Subscription.EMPTY = (function (empty) {
	        empty.isUnsubscribed = true;
	        return empty;
	    }(new Subscription()));
	    return Subscription;
	}());
	exports.Subscription = Subscription;
	//# sourceMappingURL=Subscription.js.map

/***/ },
/* 17 */
/***/ function(module, exports) {

	"use strict";
	exports.isArray = Array.isArray || (function (x) { return x && typeof x.length === 'number'; });
	//# sourceMappingURL=isArray.js.map

/***/ },
/* 18 */
/***/ function(module, exports) {

	"use strict";
	function isObject(x) {
	    return x != null && typeof x === 'object';
	}
	exports.isObject = isObject;
	//# sourceMappingURL=isObject.js.map

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var errorObject_1 = __webpack_require__(20);
	var tryCatchTarget;
	function tryCatcher() {
	    try {
	        return tryCatchTarget.apply(this, arguments);
	    }
	    catch (e) {
	        errorObject_1.errorObject.e = e;
	        return errorObject_1.errorObject;
	    }
	}
	function tryCatch(fn) {
	    tryCatchTarget = fn;
	    return tryCatcher;
	}
	exports.tryCatch = tryCatch;
	;
	//# sourceMappingURL=tryCatch.js.map

/***/ },
/* 20 */
/***/ function(module, exports) {

	"use strict";
	// typeof any so that it we don't have to cast when comparing a result to the error object
	exports.errorObject = { e: {} };
	//# sourceMappingURL=errorObject.js.map

/***/ },
/* 21 */
/***/ function(module, exports) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	/**
	 * An error thrown when one or more errors have occurred during the
	 * `unsubscribe` of a {@link Subscription}.
	 */
	var UnsubscriptionError = (function (_super) {
	    __extends(UnsubscriptionError, _super);
	    function UnsubscriptionError(errors) {
	        _super.call(this);
	        this.errors = errors;
	        this.name = 'UnsubscriptionError';
	        this.message = errors ? errors.length + " errors occurred during unsubscription:\n" + errors.map(function (err, i) { return ((i + 1) + ") " + err.toString()); }).join('\n') : '';
	    }
	    return UnsubscriptionError;
	}(Error));
	exports.UnsubscriptionError = UnsubscriptionError;
	//# sourceMappingURL=UnsubscriptionError.js.map

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var root_1 = __webpack_require__(10);
	var Symbol = root_1.root.Symbol;
	exports.$$rxSubscriber = (typeof Symbol === 'function' && typeof Symbol.for === 'function') ?
	    Symbol.for('rxSubscriber') : '@@rxSubscriber';
	//# sourceMappingURL=rxSubscriber.js.map

/***/ },
/* 23 */
/***/ function(module, exports) {

	"use strict";
	exports.empty = {
	    isUnsubscribed: true,
	    next: function (value) { },
	    error: function (err) { throw err; },
	    complete: function () { }
	};
	//# sourceMappingURL=Observer.js.map

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subscriber_1 = __webpack_require__(14);
	/**
	 * Applies a given `project` function to each value emitted by the source
	 * Observable, and emits the resulting values as an Observable.
	 *
	 * <span class="informal">Like [Array.prototype.map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map),
	 * it passes each source value through a transformation function to get
	 * corresponding output values.</span>
	 *
	 * <img src="./img/map.png" width="100%">
	 *
	 * Similar to the well known `Array.prototype.map` function, this operator
	 * applies a projection to each value and emits that projection in the output
	 * Observable.
	 *
	 * @example <caption>Map every every click to the clientX position of that click</caption>
	 * var clicks = Rx.Observable.fromEvent(document, 'click');
	 * var positions = clicks.map(ev => ev.clientX);
	 * positions.subscribe(x => console.log(x));
	 *
	 * @see {@link mapTo}
	 * @see {@link pluck}
	 *
	 * @param {function(value: T, index: number): R} project The function to apply
	 * to each `value` emitted by the source Observable. The `index` parameter is
	 * the number `i` for the i-th emission that has happened since the
	 * subscription, starting from the number `0`.
	 * @param {any} [thisArg] An optional argument to define what `this` is in the
	 * `project` function.
	 * @return {Observable<R>} An Observable that emits the values from the source
	 * Observable transformed by the given `project` function.
	 * @method map
	 * @owner Observable
	 */
	function map(project, thisArg) {
	    if (typeof project !== 'function') {
	        throw new TypeError('argument is not a function. Are you looking for `mapTo()`?');
	    }
	    return this.lift(new MapOperator(project, thisArg));
	}
	exports.map = map;
	var MapOperator = (function () {
	    function MapOperator(project, thisArg) {
	        this.project = project;
	        this.thisArg = thisArg;
	    }
	    MapOperator.prototype.call = function (subscriber, source) {
	        return source._subscribe(new MapSubscriber(subscriber, this.project, this.thisArg));
	    };
	    return MapOperator;
	}());
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var MapSubscriber = (function (_super) {
	    __extends(MapSubscriber, _super);
	    function MapSubscriber(destination, project, thisArg) {
	        _super.call(this, destination);
	        this.project = project;
	        this.count = 0;
	        this.thisArg = thisArg || this;
	    }
	    // NOTE: This looks unoptimized, but it's actually purposefully NOT
	    // using try/catch optimizations.
	    MapSubscriber.prototype._next = function (value) {
	        var result;
	        try {
	            result = this.project.call(this.thisArg, value, this.count++);
	        }
	        catch (err) {
	            this.destination.error(err);
	            return;
	        }
	        this.destination.next(result);
	    };
	    return MapSubscriber;
	}(Subscriber_1.Subscriber));
	//# sourceMappingURL=map.js.map

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Observable_1 = __webpack_require__(9);
	var mapTo_1 = __webpack_require__(26);
	Observable_1.Observable.prototype.mapTo = mapTo_1.mapTo;
	//# sourceMappingURL=mapTo.js.map

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subscriber_1 = __webpack_require__(14);
	/**
	 * Emits the given constant value on the output Observable every time the source
	 * Observable emits a value.
	 *
	 * <span class="informal">Like {@link map}, but it maps every source value to
	 * the same output value every time.</span>
	 *
	 * <img src="./img/mapTo.png" width="100%">
	 *
	 * Takes a constant `value` as argument, and emits that whenever the source
	 * Observable emits a value. In other words, ignores the actual source value,
	 * and simply uses the emission moment to know when to emit the given `value`.
	 *
	 * @example <caption>Map every every click to the string 'Hi'</caption>
	 * var clicks = Rx.Observable.fromEvent(document, 'click');
	 * var greetings = clicks.mapTo('Hi');
	 * greetings.subscribe(x => console.log(x));
	 *
	 * @see {@link map}
	 *
	 * @param {any} value The value to map each source value to.
	 * @return {Observable} An Observable that emits the given `value` every time
	 * the source Observable emits something.
	 * @method mapTo
	 * @owner Observable
	 */
	function mapTo(value) {
	    return this.lift(new MapToOperator(value));
	}
	exports.mapTo = mapTo;
	var MapToOperator = (function () {
	    function MapToOperator(value) {
	        this.value = value;
	    }
	    MapToOperator.prototype.call = function (subscriber, source) {
	        return source._subscribe(new MapToSubscriber(subscriber, this.value));
	    };
	    return MapToOperator;
	}());
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var MapToSubscriber = (function (_super) {
	    __extends(MapToSubscriber, _super);
	    function MapToSubscriber(destination, value) {
	        _super.call(this, destination);
	        this.value = value;
	    }
	    MapToSubscriber.prototype._next = function (x) {
	        this.destination.next(this.value);
	    };
	    return MapToSubscriber;
	}(Subscriber_1.Subscriber));
	//# sourceMappingURL=mapTo.js.map

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Observable_1 = __webpack_require__(9);
	var share_1 = __webpack_require__(28);
	Observable_1.Observable.prototype.share = share_1.share;
	//# sourceMappingURL=share.js.map

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var multicast_1 = __webpack_require__(29);
	var Subject_1 = __webpack_require__(31);
	function shareSubjectFactory() {
	    return new Subject_1.Subject();
	}
	/**
	 * Returns a new Observable that multicasts (shares) the original Observable. As long as there is at least one
	 * Subscriber this Observable will be subscribed and emitting data. When all subscribers have unsubscribed it will
	 * unsubscribe from the source Observable. Because the Observable is multicasting it makes the stream `hot`.
	 * This is an alias for .publish().refCount().
	 *
	 * <img src="./img/share.png" width="100%">
	 *
	 * @return {Observable<T>} an Observable that upon connection causes the source Observable to emit items to its Observers
	 * @method share
	 * @owner Observable
	 */
	function share() {
	    return multicast_1.multicast.call(this, shareSubjectFactory).refCount();
	}
	exports.share = share;
	;
	//# sourceMappingURL=share.js.map

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var ConnectableObservable_1 = __webpack_require__(30);
	/**
	 * Returns an Observable that emits the results of invoking a specified selector on items
	 * emitted by a ConnectableObservable that shares a single subscription to the underlying stream.
	 *
	 * <img src="./img/multicast.png" width="100%">
	 *
	 * @param {Function} selector - a function that can use the multicasted source stream
	 * as many times as needed, without causing multiple subscriptions to the source stream.
	 * Subscribers to the given source will receive all notifications of the source from the
	 * time of the subscription forward.
	 * @return {Observable} an Observable that emits the results of invoking the selector
	 * on the items emitted by a `ConnectableObservable` that shares a single subscription to
	 * the underlying stream.
	 * @method multicast
	 * @owner Observable
	 */
	function multicast(subjectOrSubjectFactory) {
	    var subjectFactory;
	    if (typeof subjectOrSubjectFactory === 'function') {
	        subjectFactory = subjectOrSubjectFactory;
	    }
	    else {
	        subjectFactory = function subjectFactory() {
	            return subjectOrSubjectFactory;
	        };
	    }
	    return new ConnectableObservable_1.ConnectableObservable(this, subjectFactory);
	}
	exports.multicast = multicast;
	//# sourceMappingURL=multicast.js.map

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Observable_1 = __webpack_require__(9);
	var Subscriber_1 = __webpack_require__(14);
	var Subscription_1 = __webpack_require__(16);
	/**
	 * @class ConnectableObservable<T>
	 */
	var ConnectableObservable = (function (_super) {
	    __extends(ConnectableObservable, _super);
	    function ConnectableObservable(source, subjectFactory) {
	        _super.call(this);
	        this.source = source;
	        this.subjectFactory = subjectFactory;
	    }
	    ConnectableObservable.prototype._subscribe = function (subscriber) {
	        return this.getSubject().subscribe(subscriber);
	    };
	    ConnectableObservable.prototype.getSubject = function () {
	        var subject = this.subject;
	        if (subject && !subject.isUnsubscribed) {
	            return subject;
	        }
	        return (this.subject = this.subjectFactory());
	    };
	    ConnectableObservable.prototype.connect = function () {
	        var source = this.source;
	        var subscription = this.subscription;
	        if (subscription && !subscription.isUnsubscribed) {
	            return subscription;
	        }
	        subscription = source.subscribe(this.getSubject());
	        subscription.add(new ConnectableSubscription(this));
	        return (this.subscription = subscription);
	    };
	    ConnectableObservable.prototype.refCount = function () {
	        return new RefCountObservable(this);
	    };
	    /**
	     * This method is opened for `ConnectableSubscription`.
	     * Not to call from others.
	     */
	    ConnectableObservable.prototype._closeSubscription = function () {
	        this.subject = null;
	        this.subscription = null;
	    };
	    return ConnectableObservable;
	}(Observable_1.Observable));
	exports.ConnectableObservable = ConnectableObservable;
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var ConnectableSubscription = (function (_super) {
	    __extends(ConnectableSubscription, _super);
	    function ConnectableSubscription(connectable) {
	        _super.call(this);
	        this.connectable = connectable;
	    }
	    ConnectableSubscription.prototype._unsubscribe = function () {
	        var connectable = this.connectable;
	        connectable._closeSubscription();
	        this.connectable = null;
	    };
	    return ConnectableSubscription;
	}(Subscription_1.Subscription));
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var RefCountObservable = (function (_super) {
	    __extends(RefCountObservable, _super);
	    function RefCountObservable(connectable, refCount) {
	        if (refCount === void 0) { refCount = 0; }
	        _super.call(this);
	        this.connectable = connectable;
	        this.refCount = refCount;
	    }
	    RefCountObservable.prototype._subscribe = function (subscriber) {
	        var connectable = this.connectable;
	        var refCountSubscriber = new RefCountSubscriber(subscriber, this);
	        var subscription = connectable.subscribe(refCountSubscriber);
	        if (!subscription.isUnsubscribed && ++this.refCount === 1) {
	            refCountSubscriber.connection = this.connection = connectable.connect();
	        }
	        return subscription;
	    };
	    return RefCountObservable;
	}(Observable_1.Observable));
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var RefCountSubscriber = (function (_super) {
	    __extends(RefCountSubscriber, _super);
	    function RefCountSubscriber(destination, refCountObservable) {
	        _super.call(this, null);
	        this.destination = destination;
	        this.refCountObservable = refCountObservable;
	        this.connection = refCountObservable.connection;
	        destination.add(this);
	    }
	    RefCountSubscriber.prototype._next = function (value) {
	        this.destination.next(value);
	    };
	    RefCountSubscriber.prototype._error = function (err) {
	        this._resetConnectable();
	        this.destination.error(err);
	    };
	    RefCountSubscriber.prototype._complete = function () {
	        this._resetConnectable();
	        this.destination.complete();
	    };
	    RefCountSubscriber.prototype._resetConnectable = function () {
	        var observable = this.refCountObservable;
	        var obsConnection = observable.connection;
	        var subConnection = this.connection;
	        if (subConnection && subConnection === obsConnection) {
	            observable.refCount = 0;
	            obsConnection.unsubscribe();
	            observable.connection = null;
	            this.unsubscribe();
	        }
	    };
	    RefCountSubscriber.prototype._unsubscribe = function () {
	        var observable = this.refCountObservable;
	        if (observable.refCount === 0) {
	            return;
	        }
	        if (--observable.refCount === 0) {
	            var obsConnection = observable.connection;
	            var subConnection = this.connection;
	            if (subConnection && subConnection === obsConnection) {
	                obsConnection.unsubscribe();
	                observable.connection = null;
	            }
	        }
	    };
	    return RefCountSubscriber;
	}(Subscriber_1.Subscriber));
	//# sourceMappingURL=ConnectableObservable.js.map

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Observable_1 = __webpack_require__(9);
	var Subscriber_1 = __webpack_require__(14);
	var Subscription_1 = __webpack_require__(16);
	var SubjectSubscription_1 = __webpack_require__(32);
	var rxSubscriber_1 = __webpack_require__(22);
	var throwError_1 = __webpack_require__(33);
	var ObjectUnsubscribedError_1 = __webpack_require__(34);
	/**
	 * @class Subject<T>
	 */
	var Subject = (function (_super) {
	    __extends(Subject, _super);
	    function Subject(destination, source) {
	        _super.call(this);
	        this.destination = destination;
	        this.source = source;
	        this.observers = [];
	        this.isUnsubscribed = false;
	        this.isStopped = false;
	        this.hasErrored = false;
	        this.dispatching = false;
	        this.hasCompleted = false;
	        this.source = source;
	    }
	    Subject.prototype.lift = function (operator) {
	        var subject = new Subject(this.destination || this, this);
	        subject.operator = operator;
	        return subject;
	    };
	    Subject.prototype.add = function (subscription) {
	        return Subscription_1.Subscription.prototype.add.call(this, subscription);
	    };
	    Subject.prototype.remove = function (subscription) {
	        Subscription_1.Subscription.prototype.remove.call(this, subscription);
	    };
	    Subject.prototype.unsubscribe = function () {
	        Subscription_1.Subscription.prototype.unsubscribe.call(this);
	    };
	    Subject.prototype._subscribe = function (subscriber) {
	        if (this.source) {
	            return this.source.subscribe(subscriber);
	        }
	        else {
	            if (subscriber.isUnsubscribed) {
	                return;
	            }
	            else if (this.hasErrored) {
	                return subscriber.error(this.errorValue);
	            }
	            else if (this.hasCompleted) {
	                return subscriber.complete();
	            }
	            this.throwIfUnsubscribed();
	            var subscription = new SubjectSubscription_1.SubjectSubscription(this, subscriber);
	            this.observers.push(subscriber);
	            return subscription;
	        }
	    };
	    Subject.prototype._unsubscribe = function () {
	        this.source = null;
	        this.isStopped = true;
	        this.observers = null;
	        this.destination = null;
	    };
	    Subject.prototype.next = function (value) {
	        this.throwIfUnsubscribed();
	        if (this.isStopped) {
	            return;
	        }
	        this.dispatching = true;
	        this._next(value);
	        this.dispatching = false;
	        if (this.hasErrored) {
	            this._error(this.errorValue);
	        }
	        else if (this.hasCompleted) {
	            this._complete();
	        }
	    };
	    Subject.prototype.error = function (err) {
	        this.throwIfUnsubscribed();
	        if (this.isStopped) {
	            return;
	        }
	        this.isStopped = true;
	        this.hasErrored = true;
	        this.errorValue = err;
	        if (this.dispatching) {
	            return;
	        }
	        this._error(err);
	    };
	    Subject.prototype.complete = function () {
	        this.throwIfUnsubscribed();
	        if (this.isStopped) {
	            return;
	        }
	        this.isStopped = true;
	        this.hasCompleted = true;
	        if (this.dispatching) {
	            return;
	        }
	        this._complete();
	    };
	    Subject.prototype.asObservable = function () {
	        var observable = new SubjectObservable(this);
	        return observable;
	    };
	    Subject.prototype._next = function (value) {
	        if (this.destination) {
	            this.destination.next(value);
	        }
	        else {
	            this._finalNext(value);
	        }
	    };
	    Subject.prototype._finalNext = function (value) {
	        var index = -1;
	        var observers = this.observers.slice(0);
	        var len = observers.length;
	        while (++index < len) {
	            observers[index].next(value);
	        }
	    };
	    Subject.prototype._error = function (err) {
	        if (this.destination) {
	            this.destination.error(err);
	        }
	        else {
	            this._finalError(err);
	        }
	    };
	    Subject.prototype._finalError = function (err) {
	        var index = -1;
	        var observers = this.observers;
	        // optimization to block our SubjectSubscriptions from
	        // splicing themselves out of the observers list one by one.
	        this.observers = null;
	        this.isUnsubscribed = true;
	        if (observers) {
	            var len = observers.length;
	            while (++index < len) {
	                observers[index].error(err);
	            }
	        }
	        this.isUnsubscribed = false;
	        this.unsubscribe();
	    };
	    Subject.prototype._complete = function () {
	        if (this.destination) {
	            this.destination.complete();
	        }
	        else {
	            this._finalComplete();
	        }
	    };
	    Subject.prototype._finalComplete = function () {
	        var index = -1;
	        var observers = this.observers;
	        // optimization to block our SubjectSubscriptions from
	        // splicing themselves out of the observers list one by one.
	        this.observers = null;
	        this.isUnsubscribed = true;
	        if (observers) {
	            var len = observers.length;
	            while (++index < len) {
	                observers[index].complete();
	            }
	        }
	        this.isUnsubscribed = false;
	        this.unsubscribe();
	    };
	    Subject.prototype.throwIfUnsubscribed = function () {
	        if (this.isUnsubscribed) {
	            throwError_1.throwError(new ObjectUnsubscribedError_1.ObjectUnsubscribedError());
	        }
	    };
	    Subject.prototype[rxSubscriber_1.$$rxSubscriber] = function () {
	        return new Subscriber_1.Subscriber(this);
	    };
	    Subject.create = function (destination, source) {
	        return new Subject(destination, source);
	    };
	    return Subject;
	}(Observable_1.Observable));
	exports.Subject = Subject;
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var SubjectObservable = (function (_super) {
	    __extends(SubjectObservable, _super);
	    function SubjectObservable(source) {
	        _super.call(this);
	        this.source = source;
	    }
	    return SubjectObservable;
	}(Observable_1.Observable));
	//# sourceMappingURL=Subject.js.map

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subscription_1 = __webpack_require__(16);
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var SubjectSubscription = (function (_super) {
	    __extends(SubjectSubscription, _super);
	    function SubjectSubscription(subject, observer) {
	        _super.call(this);
	        this.subject = subject;
	        this.observer = observer;
	        this.isUnsubscribed = false;
	    }
	    SubjectSubscription.prototype.unsubscribe = function () {
	        if (this.isUnsubscribed) {
	            return;
	        }
	        this.isUnsubscribed = true;
	        var subject = this.subject;
	        var observers = subject.observers;
	        this.subject = null;
	        if (!observers || observers.length === 0 || subject.isUnsubscribed) {
	            return;
	        }
	        var subscriberIndex = observers.indexOf(this.observer);
	        if (subscriberIndex !== -1) {
	            observers.splice(subscriberIndex, 1);
	        }
	    };
	    return SubjectSubscription;
	}(Subscription_1.Subscription));
	exports.SubjectSubscription = SubjectSubscription;
	//# sourceMappingURL=SubjectSubscription.js.map

/***/ },
/* 33 */
/***/ function(module, exports) {

	"use strict";
	function throwError(e) { throw e; }
	exports.throwError = throwError;
	//# sourceMappingURL=throwError.js.map

/***/ },
/* 34 */
/***/ function(module, exports) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	/**
	 * An error thrown when an action is invalid because the object has been
	 * unsubscribed.
	 *
	 * @see {@link Subject}
	 * @see {@link BehaviorSubject}
	 *
	 * @class ObjectUnsubscribedError
	 */
	var ObjectUnsubscribedError = (function (_super) {
	    __extends(ObjectUnsubscribedError, _super);
	    function ObjectUnsubscribedError() {
	        _super.call(this, 'object unsubscribed');
	        this.name = 'ObjectUnsubscribedError';
	    }
	    return ObjectUnsubscribedError;
	}(Error));
	exports.ObjectUnsubscribedError = ObjectUnsubscribedError;
	//# sourceMappingURL=ObjectUnsubscribedError.js.map

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.createComponentProps = createComponentProps;

	var _BehaviorSubject = __webpack_require__(5);

	var _isObservable = __webpack_require__(36);

	var _isObservable2 = _interopRequireDefault(_isObservable);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/* @flow */

	/*:: type ComponentProps = {
	  asObject (): Object,
	  next (v: Object): void,
	}*/
	function createComponentProps(_props /*: Object*/) /*: ComponentProps*/ {
	  var keys /*: Array<string>*/ = Object.keys(_props);
	  var plainValueKeys /*: Object*/ = {};

	  var props /*: Object*/ = {};
	  var len /*: number*/ = keys.length;
	  var i /*: number*/ = -1;

	  while (++i < len) {
	    var key = keys[i];
	    var value = _props[key];

	    if ((0, _isObservable2.default)(value)) {
	      props[key] = value;
	    } else {
	      plainValueKeys[key] = true;
	      props[key] = new _BehaviorSubject.BehaviorSubject(value);
	    }
	  }

	  return {
	    asObject: function asObject() {
	      return props;
	    },
	    next: function (_next) {
	      function next(_x) {
	        return _next.apply(this, arguments);
	      }

	      next.toString = function () {
	        return _next.toString();
	      };

	      return next;
	    }(function (next /*: Object*/) {
	      var j /*: number*/ = -1;

	      while (++j < len) {
	        var _key /*: string*/ = keys[j];
	        var _value /*: any*/ = next[_key];
	        var old /*: any*/ = props[_key];

	        if (plainValueKeys[_key]) {
	          old.next(_value);
	        } else if (_value !== old) {
	          throw new Error('Observable prop "' + _key + '" changed to different observable');
	        }
	      }
	    })
	  };
	}

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var symbolObservable = __webpack_require__(37);

	module.exports = function (fn) {
		return Boolean(fn && fn[symbolObservable]);
	};


/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/* global window */
	'use strict';

	module.exports = __webpack_require__(38)(global || window || this);

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 38 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function symbolObservablePonyfill(root) {
		var result;
		var Symbol = root.Symbol;

		if (typeof Symbol === 'function') {
			if (Symbol.observable) {
				result = Symbol.observable;
			} else {
				result = Symbol('observable');
				Symbol.observable = result;
			}
		} else {
			result = '@@observable';
		}

		return result;
	};


/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.createCompositeSubject = undefined;

	var _Observable = __webpack_require__(5);

	var _Observer = __webpack_require__(5);

	var _Subject = __webpack_require__(5);

	var _Subscription = __webpack_require__(5);

	var _BehaviorSubject = __webpack_require__(5);

	__webpack_require__(40);

	/* @flow */

	var createCompositeSubject = exports.createCompositeSubject = function createCompositeSubject(switchMapFn /*: Function*/) /*: Function*/ {
	  return function (value /*: any*/) /*: Subject<any>*/ {
	    var behavior /*: BehaviorSubject*/ = new _BehaviorSubject.BehaviorSubject(value);

	    var observable /*: Observable*/ = _Observable.Observable.create(function (observer /*: Observer*/) /*: Function*/ {
	      var subscription /*: Subscription*/ = behavior.switchMap(switchMapFn).subscribe(observer);
	      return function () {
	        return subscription.unsubscribe();
	      };
	    });

	    return _Subject.Subject.create(behavior, observable);
	  };
	};

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Observable_1 = __webpack_require__(9);
	var switchMap_1 = __webpack_require__(41);
	Observable_1.Observable.prototype.switchMap = switchMap_1.switchMap;
	//# sourceMappingURL=switchMap.js.map

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var OuterSubscriber_1 = __webpack_require__(42);
	var subscribeToResult_1 = __webpack_require__(43);
	/**
	 * Projects each source value to an Observable which is merged in the output
	 * Observable, emitting values only from the most recently projected Observable.
	 *
	 * <span class="informal">Maps each value to an Observable, then flattens all of
	 * these inner Observables using {@link switch}.</span>
	 *
	 * <img src="./img/switchMap.png" width="100%">
	 *
	 * Returns an Observable that emits items based on applying a function that you
	 * supply to each item emitted by the source Observable, where that function
	 * returns an (so-called "inner") Observable. Each time it observes one of these
	 * inner Observables, the output Observable begins emitting the items emitted by
	 * that inner Observable. When a new inner Observable is emitted, `switchMap`
	 * stops emitting items from the earlier-emitted inner Observable and begins
	 * emitting items from the new one. It continues to behave like this for
	 * subsequent inner Observables.
	 *
	 * @example <caption>Rerun an interval Observable on every click event</caption>
	 * var clicks = Rx.Observable.fromEvent(document, 'click');
	 * var result = clicks.switchMap((ev) => Rx.Observable.interval(1000));
	 * result.subscribe(x => console.log(x));
	 *
	 * @see {@link concatMap}
	 * @see {@link exhaustMap}
	 * @see {@link mergeMap}
	 * @see {@link switch}
	 * @see {@link switchMapTo}
	 *
	 * @param {function(value: T, ?index: number): Observable} project A function
	 * that, when applied to an item emitted by the source Observable, returns an
	 * Observable.
	 * @param {function(outerValue: T, innerValue: I, outerIndex: number, innerIndex: number): any} [resultSelector]
	 * A function to produce the value on the output Observable based on the values
	 * and the indices of the source (outer) emission and the inner Observable
	 * emission. The arguments passed to this function are:
	 * - `outerValue`: the value that came from the source
	 * - `innerValue`: the value that came from the projected Observable
	 * - `outerIndex`: the "index" of the value that came from the source
	 * - `innerIndex`: the "index" of the value from the projected Observable
	 * @return {Observable} An Observable that emits the result of applying the
	 * projection function (and the optional `resultSelector`) to each item emitted
	 * by the source Observable and taking only the values from the most recently
	 * projected inner Observable.
	 * @method switchMap
	 * @owner Observable
	 */
	function switchMap(project, resultSelector) {
	    return this.lift(new SwitchMapOperator(project, resultSelector));
	}
	exports.switchMap = switchMap;
	var SwitchMapOperator = (function () {
	    function SwitchMapOperator(project, resultSelector) {
	        this.project = project;
	        this.resultSelector = resultSelector;
	    }
	    SwitchMapOperator.prototype.call = function (subscriber, source) {
	        return source._subscribe(new SwitchMapSubscriber(subscriber, this.project, this.resultSelector));
	    };
	    return SwitchMapOperator;
	}());
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var SwitchMapSubscriber = (function (_super) {
	    __extends(SwitchMapSubscriber, _super);
	    function SwitchMapSubscriber(destination, project, resultSelector) {
	        _super.call(this, destination);
	        this.project = project;
	        this.resultSelector = resultSelector;
	        this.index = 0;
	    }
	    SwitchMapSubscriber.prototype._next = function (value) {
	        var result;
	        var index = this.index++;
	        try {
	            result = this.project(value, index);
	        }
	        catch (error) {
	            this.destination.error(error);
	            return;
	        }
	        this._innerSub(result, value, index);
	    };
	    SwitchMapSubscriber.prototype._innerSub = function (result, value, index) {
	        var innerSubscription = this.innerSubscription;
	        if (innerSubscription) {
	            innerSubscription.unsubscribe();
	        }
	        this.add(this.innerSubscription = subscribeToResult_1.subscribeToResult(this, result, value, index));
	    };
	    SwitchMapSubscriber.prototype._complete = function () {
	        var innerSubscription = this.innerSubscription;
	        if (!innerSubscription || innerSubscription.isUnsubscribed) {
	            _super.prototype._complete.call(this);
	        }
	    };
	    SwitchMapSubscriber.prototype._unsubscribe = function () {
	        this.innerSubscription = null;
	    };
	    SwitchMapSubscriber.prototype.notifyComplete = function (innerSub) {
	        this.remove(innerSub);
	        this.innerSubscription = null;
	        if (this.isStopped) {
	            _super.prototype._complete.call(this);
	        }
	    };
	    SwitchMapSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
	        if (this.resultSelector) {
	            this._tryNotifyNext(outerValue, innerValue, outerIndex, innerIndex);
	        }
	        else {
	            this.destination.next(innerValue);
	        }
	    };
	    SwitchMapSubscriber.prototype._tryNotifyNext = function (outerValue, innerValue, outerIndex, innerIndex) {
	        var result;
	        try {
	            result = this.resultSelector(outerValue, innerValue, outerIndex, innerIndex);
	        }
	        catch (err) {
	            this.destination.error(err);
	            return;
	        }
	        this.destination.next(result);
	    };
	    return SwitchMapSubscriber;
	}(OuterSubscriber_1.OuterSubscriber));
	//# sourceMappingURL=switchMap.js.map

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subscriber_1 = __webpack_require__(14);
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var OuterSubscriber = (function (_super) {
	    __extends(OuterSubscriber, _super);
	    function OuterSubscriber() {
	        _super.apply(this, arguments);
	    }
	    OuterSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
	        this.destination.next(innerValue);
	    };
	    OuterSubscriber.prototype.notifyError = function (error, innerSub) {
	        this.destination.error(error);
	    };
	    OuterSubscriber.prototype.notifyComplete = function (innerSub) {
	        this.destination.complete();
	    };
	    return OuterSubscriber;
	}(Subscriber_1.Subscriber));
	exports.OuterSubscriber = OuterSubscriber;
	//# sourceMappingURL=OuterSubscriber.js.map

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var root_1 = __webpack_require__(10);
	var isArray_1 = __webpack_require__(17);
	var isPromise_1 = __webpack_require__(44);
	var Observable_1 = __webpack_require__(9);
	var iterator_1 = __webpack_require__(45);
	var observable_1 = __webpack_require__(12);
	var InnerSubscriber_1 = __webpack_require__(46);
	function subscribeToResult(outerSubscriber, result, outerValue, outerIndex) {
	    var destination = new InnerSubscriber_1.InnerSubscriber(outerSubscriber, outerValue, outerIndex);
	    if (destination.isUnsubscribed) {
	        return;
	    }
	    if (result instanceof Observable_1.Observable) {
	        if (result._isScalar) {
	            destination.next(result.value);
	            destination.complete();
	            return;
	        }
	        else {
	            return result.subscribe(destination);
	        }
	    }
	    if (isArray_1.isArray(result)) {
	        for (var i = 0, len = result.length; i < len && !destination.isUnsubscribed; i++) {
	            destination.next(result[i]);
	        }
	        if (!destination.isUnsubscribed) {
	            destination.complete();
	        }
	    }
	    else if (isPromise_1.isPromise(result)) {
	        result.then(function (value) {
	            if (!destination.isUnsubscribed) {
	                destination.next(value);
	                destination.complete();
	            }
	        }, function (err) { return destination.error(err); })
	            .then(null, function (err) {
	            // Escaping the Promise trap: globally throw unhandled errors
	            root_1.root.setTimeout(function () { throw err; });
	        });
	        return destination;
	    }
	    else if (typeof result[iterator_1.$$iterator] === 'function') {
	        for (var _i = 0, _a = result; _i < _a.length; _i++) {
	            var item = _a[_i];
	            destination.next(item);
	            if (destination.isUnsubscribed) {
	                break;
	            }
	        }
	        if (!destination.isUnsubscribed) {
	            destination.complete();
	        }
	    }
	    else if (typeof result[observable_1.$$observable] === 'function') {
	        var obs = result[observable_1.$$observable]();
	        if (typeof obs.subscribe !== 'function') {
	            destination.error('invalid observable');
	        }
	        else {
	            return obs.subscribe(new InnerSubscriber_1.InnerSubscriber(outerSubscriber, outerValue, outerIndex));
	        }
	    }
	    else {
	        destination.error(new TypeError('unknown type returned'));
	    }
	}
	exports.subscribeToResult = subscribeToResult;
	//# sourceMappingURL=subscribeToResult.js.map

/***/ },
/* 44 */
/***/ function(module, exports) {

	"use strict";
	function isPromise(value) {
	    return value && typeof value.subscribe !== 'function' && typeof value.then === 'function';
	}
	exports.isPromise = isPromise;
	//# sourceMappingURL=isPromise.js.map

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var root_1 = __webpack_require__(10);
	var Symbol = root_1.root.Symbol;
	if (typeof Symbol === 'function') {
	    if (Symbol.iterator) {
	        exports.$$iterator = Symbol.iterator;
	    }
	    else if (typeof Symbol.for === 'function') {
	        exports.$$iterator = Symbol.for('iterator');
	    }
	}
	else {
	    if (root_1.root.Set && typeof new root_1.root.Set()['@@iterator'] === 'function') {
	        // Bug for mozilla version
	        exports.$$iterator = '@@iterator';
	    }
	    else if (root_1.root.Map) {
	        // es6-shim specific logic
	        var keys = Object.getOwnPropertyNames(root_1.root.Map.prototype);
	        for (var i = 0; i < keys.length; ++i) {
	            var key = keys[i];
	            if (key !== 'entries' && key !== 'size' && root_1.root.Map.prototype[key] === root_1.root.Map.prototype['entries']) {
	                exports.$$iterator = key;
	                break;
	            }
	        }
	    }
	    else {
	        exports.$$iterator = '@@iterator';
	    }
	}
	//# sourceMappingURL=iterator.js.map

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subscriber_1 = __webpack_require__(14);
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var InnerSubscriber = (function (_super) {
	    __extends(InnerSubscriber, _super);
	    function InnerSubscriber(parent, outerValue, outerIndex) {
	        _super.call(this);
	        this.parent = parent;
	        this.outerValue = outerValue;
	        this.outerIndex = outerIndex;
	        this.index = 0;
	    }
	    InnerSubscriber.prototype._next = function (value) {
	        this.parent.notifyNext(this.outerValue, value, this.outerIndex, this.index++, this);
	    };
	    InnerSubscriber.prototype._error = function (error) {
	        this.parent.notifyError(error, this);
	        this.unsubscribe();
	    };
	    InnerSubscriber.prototype._complete = function () {
	        this.parent.notifyComplete(this);
	        this.unsubscribe();
	    };
	    return InnerSubscriber;
	}(Subscriber_1.Subscriber));
	exports.InnerSubscriber = InnerSubscriber;
	//# sourceMappingURL=InnerSubscriber.js.map

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.createObservableFromArray = createObservableFromArray;

	var _Observable = __webpack_require__(5);

	var _asObservable = __webpack_require__(48);

	__webpack_require__(49);

	__webpack_require__(55);

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } } /* @flow */

	function createObservableFromArray(arr /*: Array<any>*/) /*: Observable<Array<any>>*/ {
	  if (arr.length === 0) {
	    return _Observable.Observable.of(arr);
	  }

	  var observables /*: Array<Observable>*/ = arr.map(_asObservable.asObservable);

	  return _Observable.Observable.combineLatest.apply(_Observable.Observable, _toConsumableArray(observables));
	}

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.asObservable = asObservable;

	var _Observable = __webpack_require__(5);

	var _isObservable = __webpack_require__(36);

	var _isObservable2 = _interopRequireDefault(_isObservable);

	__webpack_require__(49);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function asObservable(obj /*: any*/) /*: Observable<any>*/ {
	  if ((0, _isObservable2.default)(obj)) {
	    return obj;
	  }

	  return _Observable.Observable.of(obj);
	} /* @flow */

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Observable_1 = __webpack_require__(9);
	var of_1 = __webpack_require__(50);
	Observable_1.Observable.of = of_1.of;
	//# sourceMappingURL=of.js.map

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var ArrayObservable_1 = __webpack_require__(51);
	exports.of = ArrayObservable_1.ArrayObservable.of;
	//# sourceMappingURL=of.js.map

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Observable_1 = __webpack_require__(9);
	var ScalarObservable_1 = __webpack_require__(52);
	var EmptyObservable_1 = __webpack_require__(53);
	var isScheduler_1 = __webpack_require__(54);
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @extends {Ignored}
	 * @hide true
	 */
	var ArrayObservable = (function (_super) {
	    __extends(ArrayObservable, _super);
	    function ArrayObservable(array, scheduler) {
	        _super.call(this);
	        this.array = array;
	        this.scheduler = scheduler;
	        if (!scheduler && array.length === 1) {
	            this._isScalar = true;
	            this.value = array[0];
	        }
	    }
	    ArrayObservable.create = function (array, scheduler) {
	        return new ArrayObservable(array, scheduler);
	    };
	    /**
	     * Creates an Observable that emits some values you specify as arguments,
	     * immediately one after the other, and then emits a complete notification.
	     *
	     * <span class="informal">Emits the arguments you provide, then completes.
	     * </span>
	     *
	     * <img src="./img/of.png" width="100%">
	     *
	     * This static operator is useful for creating a simple Observable that only
	     * emits the arguments given, and the complete notification thereafter. It can
	     * be used for composing with other Observables, such as with {@link concat}.
	     * By default, it uses a `null` Scheduler, which means the `next`
	     * notifications are sent synchronously, although with a different Scheduler
	     * it is possible to determine when those notifications will be delivered.
	     *
	     * @example <caption>Emit 10, 20, 30, then 'a', 'b', 'c', then start ticking every second.</caption>
	     * var numbers = Rx.Observable.of(10, 20, 30);
	     * var letters = Rx.Observable.of('a', 'b', 'c');
	     * var interval = Rx.Observable.interval(1000);
	     * var result = numbers.concat(letters).concat(interval);
	     * result.subscribe(x => console.log(x));
	     *
	     * @see {@link create}
	     * @see {@link empty}
	     * @see {@link never}
	     * @see {@link throw}
	     *
	     * @param {...T} values Arguments that represent `next` values to be emitted.
	     * @param {Scheduler} [scheduler] A {@link Scheduler} to use for scheduling
	     * the emissions of the `next` notifications.
	     * @return {Observable<T>} An Observable that emits each given input value.
	     * @static true
	     * @name of
	     * @owner Observable
	     */
	    ArrayObservable.of = function () {
	        var array = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            array[_i - 0] = arguments[_i];
	        }
	        var scheduler = array[array.length - 1];
	        if (isScheduler_1.isScheduler(scheduler)) {
	            array.pop();
	        }
	        else {
	            scheduler = null;
	        }
	        var len = array.length;
	        if (len > 1) {
	            return new ArrayObservable(array, scheduler);
	        }
	        else if (len === 1) {
	            return new ScalarObservable_1.ScalarObservable(array[0], scheduler);
	        }
	        else {
	            return new EmptyObservable_1.EmptyObservable(scheduler);
	        }
	    };
	    ArrayObservable.dispatch = function (state) {
	        var array = state.array, index = state.index, count = state.count, subscriber = state.subscriber;
	        if (index >= count) {
	            subscriber.complete();
	            return;
	        }
	        subscriber.next(array[index]);
	        if (subscriber.isUnsubscribed) {
	            return;
	        }
	        state.index = index + 1;
	        this.schedule(state);
	    };
	    ArrayObservable.prototype._subscribe = function (subscriber) {
	        var index = 0;
	        var array = this.array;
	        var count = array.length;
	        var scheduler = this.scheduler;
	        if (scheduler) {
	            return scheduler.schedule(ArrayObservable.dispatch, 0, {
	                array: array, index: index, count: count, subscriber: subscriber
	            });
	        }
	        else {
	            for (var i = 0; i < count && !subscriber.isUnsubscribed; i++) {
	                subscriber.next(array[i]);
	            }
	            subscriber.complete();
	        }
	    };
	    return ArrayObservable;
	}(Observable_1.Observable));
	exports.ArrayObservable = ArrayObservable;
	//# sourceMappingURL=ArrayObservable.js.map

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Observable_1 = __webpack_require__(9);
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @extends {Ignored}
	 * @hide true
	 */
	var ScalarObservable = (function (_super) {
	    __extends(ScalarObservable, _super);
	    function ScalarObservable(value, scheduler) {
	        _super.call(this);
	        this.value = value;
	        this.scheduler = scheduler;
	        this._isScalar = true;
	    }
	    ScalarObservable.create = function (value, scheduler) {
	        return new ScalarObservable(value, scheduler);
	    };
	    ScalarObservable.dispatch = function (state) {
	        var done = state.done, value = state.value, subscriber = state.subscriber;
	        if (done) {
	            subscriber.complete();
	            return;
	        }
	        subscriber.next(value);
	        if (subscriber.isUnsubscribed) {
	            return;
	        }
	        state.done = true;
	        this.schedule(state);
	    };
	    ScalarObservable.prototype._subscribe = function (subscriber) {
	        var value = this.value;
	        var scheduler = this.scheduler;
	        if (scheduler) {
	            return scheduler.schedule(ScalarObservable.dispatch, 0, {
	                done: false, value: value, subscriber: subscriber
	            });
	        }
	        else {
	            subscriber.next(value);
	            if (!subscriber.isUnsubscribed) {
	                subscriber.complete();
	            }
	        }
	    };
	    return ScalarObservable;
	}(Observable_1.Observable));
	exports.ScalarObservable = ScalarObservable;
	//# sourceMappingURL=ScalarObservable.js.map

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Observable_1 = __webpack_require__(9);
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @extends {Ignored}
	 * @hide true
	 */
	var EmptyObservable = (function (_super) {
	    __extends(EmptyObservable, _super);
	    function EmptyObservable(scheduler) {
	        _super.call(this);
	        this.scheduler = scheduler;
	    }
	    /**
	     * Creates an Observable that emits no items to the Observer and immediately
	     * emits a complete notification.
	     *
	     * <span class="informal">Just emits 'complete', and nothing else.
	     * </span>
	     *
	     * <img src="./img/empty.png" width="100%">
	     *
	     * This static operator is useful for creating a simple Observable that only
	     * emits the complete notification. It can be used for composing with other
	     * Observables, such as in a {@link mergeMap}.
	     *
	     * @example <caption>Emit the number 7, then complete.</caption>
	     * var result = Rx.Observable.empty().startWith(7);
	     * result.subscribe(x => console.log(x));
	     *
	     * @example <caption>Map and flatten only odd numbers to the sequence 'a', 'b', 'c'</caption>
	     * var interval = Rx.Observable.interval(1000);
	     * var result = interval.mergeMap(x =>
	     *   x % 2 === 1 ? Rx.Observable.of('a', 'b', 'c') : Rx.Observable.empty()
	     * );
	     * result.subscribe(x => console.log(x));
	     *
	     * @see {@link create}
	     * @see {@link never}
	     * @see {@link of}
	     * @see {@link throw}
	     *
	     * @param {Scheduler} [scheduler] A {@link Scheduler} to use for scheduling
	     * the emission of the complete notification.
	     * @return {Observable} An "empty" Observable: emits only the complete
	     * notification.
	     * @static true
	     * @name empty
	     * @owner Observable
	     */
	    EmptyObservable.create = function (scheduler) {
	        return new EmptyObservable(scheduler);
	    };
	    EmptyObservable.dispatch = function (arg) {
	        var subscriber = arg.subscriber;
	        subscriber.complete();
	    };
	    EmptyObservable.prototype._subscribe = function (subscriber) {
	        var scheduler = this.scheduler;
	        if (scheduler) {
	            return scheduler.schedule(EmptyObservable.dispatch, 0, { subscriber: subscriber });
	        }
	        else {
	            subscriber.complete();
	        }
	    };
	    return EmptyObservable;
	}(Observable_1.Observable));
	exports.EmptyObservable = EmptyObservable;
	//# sourceMappingURL=EmptyObservable.js.map

/***/ },
/* 54 */
/***/ function(module, exports) {

	"use strict";
	function isScheduler(value) {
	    return value && typeof value.schedule === 'function';
	}
	exports.isScheduler = isScheduler;
	//# sourceMappingURL=isScheduler.js.map

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Observable_1 = __webpack_require__(9);
	var combineLatest_1 = __webpack_require__(56);
	Observable_1.Observable.combineLatest = combineLatest_1.combineLatestStatic;
	//# sourceMappingURL=combineLatest.js.map

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var ArrayObservable_1 = __webpack_require__(51);
	var isArray_1 = __webpack_require__(17);
	var isScheduler_1 = __webpack_require__(54);
	var OuterSubscriber_1 = __webpack_require__(42);
	var subscribeToResult_1 = __webpack_require__(43);
	/**
	 * Combines multiple Observables to create an Observable whose values are
	 * calculated from the latest values of each of its input Observables.
	 *
	 * <span class="informal">Whenever any input Observable emits a value, it
	 * computes a formula using the latest values from all the inputs, then emits
	 * the output of that formula.</span>
	 *
	 * <img src="./img/combineLatest.png" width="100%">
	 *
	 * `combineLatest` combines the values from this Observable with values from
	 * Observables passed as arguments. This is done by subscribing to each
	 * Observable, in order, and collecting an array of each of the most recent
	 * values any time any of the input Observables emits, then either taking that
	 * array and passing it as arguments to an optional `project` function and
	 * emitting the return value of that, or just emitting the array of recent
	 * values directly if there is no `project` function.
	 *
	 * @example <caption>Dynamically calculate the Body-Mass Index from an Observable of weight and one for height</caption>
	 * var weight = Rx.Observable.of(70, 72, 76, 79, 75);
	 * var height = Rx.Observable.of(1.76, 1.77, 1.78);
	 * var bmi = weight.combineLatest(height, (w, h) => w / (h * h));
	 * bmi.subscribe(x => console.log('BMI is ' + x));
	 *
	 * @see {@link combineAll}
	 * @see {@link merge}
	 * @see {@link withLatestFrom}
	 *
	 * @param {Observable} other An input Observable to combine with the source
	 * Observable. More than one input Observables may be given as argument.
	 * @param {function} [project] An optional function to project the values from
	 * the combined latest values into a new value on the output Observable.
	 * @return {Observable} An Observable of projected values from the most recent
	 * values from each input Observable, or an array of the most recent values from
	 * each input Observable.
	 * @method combineLatest
	 * @owner Observable
	 */
	function combineLatest() {
	    var observables = [];
	    for (var _i = 0; _i < arguments.length; _i++) {
	        observables[_i - 0] = arguments[_i];
	    }
	    var project = null;
	    if (typeof observables[observables.length - 1] === 'function') {
	        project = observables.pop();
	    }
	    // if the first and only other argument besides the resultSelector is an array
	    // assume it's been called with `combineLatest([obs1, obs2, obs3], project)`
	    if (observables.length === 1 && isArray_1.isArray(observables[0])) {
	        observables = observables[0];
	    }
	    observables.unshift(this);
	    return new ArrayObservable_1.ArrayObservable(observables).lift(new CombineLatestOperator(project));
	}
	exports.combineLatest = combineLatest;
	/* tslint:enable:max-line-length */
	/**
	 * Combines the values from observables passed as arguments. This is done by subscribing
	 * to each observable, in order, and collecting an array of each of the most recent values any time any of the observables
	 * emits, then either taking that array and passing it as arguments to an option `project` function and emitting the return
	 * value of that, or just emitting the array of recent values directly if there is no `project` function.
	 * @param {...Observable} observables the observables to combine
	 * @param {function} [project] an optional function to project the values from the combined recent values into a new value for emission.
	 * @return {Observable} an observable of other projected values from the most recent values from each observable, or an array of each of
	 * the most recent values from each observable.
	 * @static true
	 * @name combineLatest
	 * @owner Observable
	 */
	function combineLatestStatic() {
	    var observables = [];
	    for (var _i = 0; _i < arguments.length; _i++) {
	        observables[_i - 0] = arguments[_i];
	    }
	    var project = null;
	    var scheduler = null;
	    if (isScheduler_1.isScheduler(observables[observables.length - 1])) {
	        scheduler = observables.pop();
	    }
	    if (typeof observables[observables.length - 1] === 'function') {
	        project = observables.pop();
	    }
	    // if the first and only other argument besides the resultSelector is an array
	    // assume it's been called with `combineLatest([obs1, obs2, obs3], project)`
	    if (observables.length === 1 && isArray_1.isArray(observables[0])) {
	        observables = observables[0];
	    }
	    return new ArrayObservable_1.ArrayObservable(observables, scheduler).lift(new CombineLatestOperator(project));
	}
	exports.combineLatestStatic = combineLatestStatic;
	var CombineLatestOperator = (function () {
	    function CombineLatestOperator(project) {
	        this.project = project;
	    }
	    CombineLatestOperator.prototype.call = function (subscriber, source) {
	        return source._subscribe(new CombineLatestSubscriber(subscriber, this.project));
	    };
	    return CombineLatestOperator;
	}());
	exports.CombineLatestOperator = CombineLatestOperator;
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var CombineLatestSubscriber = (function (_super) {
	    __extends(CombineLatestSubscriber, _super);
	    function CombineLatestSubscriber(destination, project) {
	        _super.call(this, destination);
	        this.project = project;
	        this.active = 0;
	        this.values = [];
	        this.observables = [];
	        this.toRespond = [];
	    }
	    CombineLatestSubscriber.prototype._next = function (observable) {
	        var toRespond = this.toRespond;
	        toRespond.push(toRespond.length);
	        this.observables.push(observable);
	    };
	    CombineLatestSubscriber.prototype._complete = function () {
	        var observables = this.observables;
	        var len = observables.length;
	        if (len === 0) {
	            this.destination.complete();
	        }
	        else {
	            this.active = len;
	            for (var i = 0; i < len; i++) {
	                var observable = observables[i];
	                this.add(subscribeToResult_1.subscribeToResult(this, observable, observable, i));
	            }
	        }
	    };
	    CombineLatestSubscriber.prototype.notifyComplete = function (unused) {
	        if ((this.active -= 1) === 0) {
	            this.destination.complete();
	        }
	    };
	    CombineLatestSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
	        var values = this.values;
	        values[outerIndex] = innerValue;
	        var toRespond = this.toRespond;
	        if (toRespond.length > 0) {
	            var found = toRespond.indexOf(outerIndex);
	            if (found !== -1) {
	                toRespond.splice(found, 1);
	            }
	        }
	        if (toRespond.length === 0) {
	            if (this.project) {
	                this._tryProject(values);
	            }
	            else {
	                this.destination.next(values);
	            }
	        }
	    };
	    CombineLatestSubscriber.prototype._tryProject = function (values) {
	        var result;
	        try {
	            result = this.project.apply(this, values);
	        }
	        catch (err) {
	            this.destination.error(err);
	            return;
	        }
	        this.destination.next(result);
	    };
	    return CombineLatestSubscriber;
	}(OuterSubscriber_1.OuterSubscriber));
	exports.CombineLatestSubscriber = CombineLatestSubscriber;
	//# sourceMappingURL=combineLatest.js.map

/***/ },
/* 57 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.set = set;
	function set(obj, key, value) {
	  obj[key] = value;
	}

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.VirtualElement = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* @flow */

	var _ElementProxy = __webpack_require__(59);

	var _wrapText = __webpack_require__(81);

	var _parseTag = __webpack_require__(84);

	var _batchInsertMessages = __webpack_require__(86);

	var _createPatchProperties = __webpack_require__(87);

	var _createPatchChildren = __webpack_require__(88);

	var _createCompositeSubject = __webpack_require__(39);

	var _createNodeProps = __webpack_require__(92);

	var _createObservableFromArray = __webpack_require__(47);

	var _flatten = __webpack_require__(93);

	var _symbol = __webpack_require__(7);

	var _set = __webpack_require__(57);

	__webpack_require__(8);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/*:: import type {Observable} from 'rxjs/Observable'*/
	/*:: import type {Subject} from 'rxjs/Subject'*/
	/*:: import type {Subscription} from 'rxjs/Subscription'*/
	/*:: import type {VirtualNode, ElementProxyDecorator} from './types'*/


	var createCompositePropSubject = (0, _createCompositeSubject.createCompositeSubject)(_createNodeProps.createNodeProps);
	var createCompositeArraySubject = (0, _createCompositeSubject.createCompositeSubject)(_createObservableFromArray.createObservableFromArray);

	var VirtualElement = exports.VirtualElement = function () {
	  function VirtualElement(tagName /*: string*/, props /*: Object*/, children /*: Array<VirtualNode>*/, key /*:: ?: string*/) {
	    _classCallCheck(this, VirtualElement);

	    this.key = key;
	    this.tagName = tagName;
	    this._props = props;
	    this._children = children;
	    this._subscriptions = [];
	  }

	  _createClass(VirtualElement, [{
	    key: 'getProxy',
	    value: function getProxy() {
	      return this._proxy;
	    }
	  }, {
	    key: 'initialize',
	    value: function initialize() {
	      var proxy /*: ElementProxy*/ = this._proxy = _ElementProxy.ElementProxy.createElement(this.tagName);
	      var props$ /*: Subject<Object>*/ = this._props$ = createCompositePropSubject(this._props);
	      var children$ /*: Subject<Array<VirtualNode>>*/ = this._children$ = createCompositeArraySubject(this._children);

	      var proxyDecorator /*: ElementProxyDecorator*/ = {
	        insertChild: function insertChild(child /*: VirtualNode*/, index /*: number*/) {
	          return (0, _batchInsertMessages.batchInsertMessages)(function (queue) {
	            child.initialize();
	            proxy.insertChild(child.getProxy(), index);
	            queue.push(child);
	          });
	        },
	        updateChild: function updateChild(previous /*: VirtualNode*/, next /*: VirtualNode*/) {
	          previous.patch(next);
	        },
	        moveChild: function moveChild(previous /*: VirtualNode*/, next /*: VirtualNode*/, index /*: number*/) {
	          previous.patch(next);
	          proxy.insertChild(next.getProxy(), index);
	        },
	        removeChild: function removeChild(child /*: VirtualNode*/) {
	          child.beforeDestroy();
	          proxy.removeChild(child.getProxy());
	          child.destroy();
	        }
	      };

	      var propSub = props$.subscribe((0, _createPatchProperties.createPatchProperties)(proxy));

	      var childrenSub = children$.map(_flatten.flatten).map(_wrapText.wrapText).subscribe((0, _createPatchChildren.createPatchChildren)(proxyDecorator));

	      this._subscriptions.push(propSub);
	      this._subscriptions.push(childrenSub);
	    }
	  }, {
	    key: 'afterInsert',
	    value: function afterInsert() {
	      this._proxy.emitMount(this._props.onMount);
	    }
	  }, {
	    key: 'patch',
	    value: function patch(next /*: VirtualNode*/) {
	      next._proxy = this._proxy;
	      next._props$ = this._props$;
	      next._children$ = this._children$;

	      next._props$.next(next._props);
	      next._children$.next(next._children);
	    }
	  }, {
	    key: 'beforeDestroy',
	    value: function beforeDestroy() {
	      this._proxy.emitUnmount(this._props.onUnmount);
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

	      return new VirtualElement(tagName, props, children, key);
	    }
	  }]);

	  return VirtualElement;
	}();

	(0, _set.set)(VirtualElement.prototype, _symbol.$$virtual, true);

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.ElementProxy = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* @flow */

	var _document = __webpack_require__(60);

	var _document2 = _interopRequireDefault(_document);

	var _propertyDescriptors = __webpack_require__(62);

	var _eventDelegator = __webpack_require__(64);

	var _mountable = __webpack_require__(77);

	var _is = __webpack_require__(6);

	var _get = __webpack_require__(79);

	var _set = __webpack_require__(57);

	var _types = __webpack_require__(80);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ElementProxy = exports.ElementProxy = function () {
	  function ElementProxy(node /*: HTMLElement*/) {
	    _classCallCheck(this, ElementProxy);

	    this._node = node;
	  }

	  _createClass(ElementProxy, [{
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
	        return node.getAttribute(key);
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
	        node.setAttribute(key, value);
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
	        node.removeAttribute(key);
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
	      return new ElementProxy(node);
	    }
	  }, {
	    key: 'querySelector',
	    value: function querySelector(selector /*: string*/) {
	      var node /*: HTMLElement*/ = _document2.default.querySelector(selector);
	      return new ElementProxy(node);
	    }
	  }, {
	    key: 'fromElement',
	    value: function fromElement(node /*: HTMLElement*/) {
	      return new ElementProxy(node);
	    }
	  }]);

	  return ElementProxy;
	}();

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {var topLevel = typeof global !== 'undefined' ? global :
	    typeof window !== 'undefined' ? window : {}
	var minDoc = __webpack_require__(61);

	if (typeof document !== 'undefined') {
	    module.exports = document;
	} else {
	    var doccy = topLevel['__GLOBAL_DOCUMENT_CACHE@4'];

	    if (!doccy) {
	        doccy = topLevel['__GLOBAL_DOCUMENT_CACHE@4'] = minDoc;
	    }

	    module.exports = doccy;
	}

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 61 */
/***/ function(module, exports) {

	/* (ignored) */

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.descriptors = undefined;

	var _eventsList = __webpack_require__(63);

	var HAS_LOWER_CASE /*: number*/ = 0x1; // transform key to all lowercase
	/* @flow */

	var HAS_DASHED_CASE /*: number*/ = 0x2; // transform key to dashed case
	var HAS_EVENT_CASE /*: number*/ = 0x4; // transform key from onClick to click
	var USE_EQUAL_SETTER /*: number*/ = 0x8; // props only settable with =
	var USE_SET_ATTRIBUTE /*: number*/ = 0x10; // props only settable with setAttribute
	var USE_EVENT_LISTENER /*: number*/ = 0x20; // props only settable with addEventListener
	var HAS_BOOLEAN_VALUE /*: number*/ = 0x40; // props can only be booleans
	var HAS_NUMBER_VALUE /*: number*/ = 0x80; // props can only be numbers
	var IS_STAR /*: number*/ = 0x100; // props can be any dashed case, e.g. data-*

	var DASHED_CASE_REGEX /*: RegExp*/ = /(?:^\w|[A-Z]|\b\w|\s+)/g;

	function checkMask(value /*: number*/, bitmask /*: number*/) /*: boolean*/ {
	  return (value & bitmask) === bitmask;
	}

	function makeDashedCase(letter /*: string*/, i /*: number*/) /*: string*/ {
	  if (+letter === 0) {
	    return '';
	  }

	  if (i === 0) {
	    return letter.toLowerCase();
	  }

	  return '-' + letter.toLowerCase();
	}

	function computeName(name /*: string*/, hasLowerCase /*: boolean*/, hasDashedCase /*: boolean*/, hasEventCase /*: boolean*/) /*: string*/ {
	  if (hasLowerCase) {
	    return name.toLowerCase();
	  } else if (hasDashedCase) {
	    return name.replace(DASHED_CASE_REGEX, makeDashedCase);
	  } else if (hasEventCase) {
	    return name.substr(2).toLowerCase();
	  }

	  return name;
	}

	var props /*: Object*/ = {
	  accept: USE_EQUAL_SETTER,
	  acceptCharset: USE_EQUAL_SETTER | HAS_DASHED_CASE,
	  accessKey: USE_EQUAL_SETTER | HAS_LOWER_CASE,
	  action: USE_EQUAL_SETTER,
	  align: USE_EQUAL_SETTER,
	  alt: USE_EQUAL_SETTER,
	  async: USE_EQUAL_SETTER | HAS_BOOLEAN_VALUE,
	  autoComplete: USE_EQUAL_SETTER | HAS_LOWER_CASE,
	  autoFocus: USE_EQUAL_SETTER | HAS_LOWER_CASE | HAS_BOOLEAN_VALUE,
	  autoPlay: USE_EQUAL_SETTER | HAS_LOWER_CASE | HAS_BOOLEAN_VALUE,
	  autoSave: USE_EQUAL_SETTER | HAS_LOWER_CASE,
	  bgColor: USE_EQUAL_SETTER | HAS_LOWER_CASE,
	  border: USE_EQUAL_SETTER,
	  checked: USE_EQUAL_SETTER | HAS_BOOLEAN_VALUE,
	  cite: USE_EQUAL_SETTER,
	  className: USE_EQUAL_SETTER,
	  color: USE_EQUAL_SETTER,
	  colSpan: USE_EQUAL_SETTER | HAS_LOWER_CASE,
	  content: USE_EQUAL_SETTER,
	  contentEditable: USE_EQUAL_SETTER | HAS_LOWER_CASE | HAS_BOOLEAN_VALUE,
	  controls: USE_EQUAL_SETTER | HAS_BOOLEAN_VALUE,
	  coords: USE_EQUAL_SETTER,
	  default: USE_EQUAL_SETTER | HAS_BOOLEAN_VALUE,
	  defer: USE_EQUAL_SETTER | HAS_BOOLEAN_VALUE,
	  dir: USE_EQUAL_SETTER,
	  dirName: USE_EQUAL_SETTER | HAS_LOWER_CASE,
	  disabled: USE_EQUAL_SETTER | HAS_BOOLEAN_VALUE,
	  draggable: USE_EQUAL_SETTER | HAS_BOOLEAN_VALUE,
	  dropZone: USE_EQUAL_SETTER | HAS_LOWER_CASE,
	  encType: USE_EQUAL_SETTER | HAS_LOWER_CASE,
	  for: USE_EQUAL_SETTER,
	  headers: USE_EQUAL_SETTER,
	  height: USE_EQUAL_SETTER,
	  href: USE_EQUAL_SETTER,
	  hrefLang: USE_EQUAL_SETTER | HAS_LOWER_CASE,
	  httpEquiv: USE_EQUAL_SETTER | HAS_DASHED_CASE,
	  icon: USE_EQUAL_SETTER,
	  id: USE_EQUAL_SETTER,
	  isMap: USE_EQUAL_SETTER | HAS_LOWER_CASE | HAS_BOOLEAN_VALUE,
	  itemProp: USE_EQUAL_SETTER | HAS_LOWER_CASE,
	  keyType: USE_EQUAL_SETTER | HAS_LOWER_CASE,
	  kind: USE_EQUAL_SETTER,
	  label: USE_EQUAL_SETTER,
	  lang: USE_EQUAL_SETTER,
	  loop: USE_EQUAL_SETTER | HAS_BOOLEAN_VALUE,
	  max: USE_EQUAL_SETTER,
	  method: USE_EQUAL_SETTER,
	  min: USE_EQUAL_SETTER,
	  multiple: USE_EQUAL_SETTER | HAS_BOOLEAN_VALUE,
	  name: USE_EQUAL_SETTER,
	  noValidate: USE_EQUAL_SETTER | HAS_LOWER_CASE | HAS_BOOLEAN_VALUE,
	  open: USE_EQUAL_SETTER | HAS_BOOLEAN_VALUE,
	  optimum: USE_EQUAL_SETTER,
	  pattern: USE_EQUAL_SETTER,
	  ping: USE_EQUAL_SETTER,
	  placeholder: USE_EQUAL_SETTER,
	  poster: USE_EQUAL_SETTER,
	  preload: USE_EQUAL_SETTER,
	  radioGroup: USE_EQUAL_SETTER | HAS_LOWER_CASE,
	  readOnly: USE_EQUAL_SETTER | HAS_LOWER_CASE | HAS_BOOLEAN_VALUE,
	  rel: USE_EQUAL_SETTER,
	  required: USE_EQUAL_SETTER | HAS_BOOLEAN_VALUE,
	  reversed: USE_EQUAL_SETTER | HAS_BOOLEAN_VALUE,
	  role: USE_EQUAL_SETTER,
	  rowSpan: USE_EQUAL_SETTER | HAS_LOWER_CASE | HAS_NUMBER_VALUE,
	  sandbox: USE_EQUAL_SETTER,
	  scope: USE_EQUAL_SETTER,
	  seamless: USE_EQUAL_SETTER | HAS_BOOLEAN_VALUE,
	  selected: USE_EQUAL_SETTER | HAS_BOOLEAN_VALUE,
	  span: USE_EQUAL_SETTER | HAS_NUMBER_VALUE,
	  src: USE_EQUAL_SETTER,
	  srcDoc: USE_EQUAL_SETTER | HAS_LOWER_CASE,
	  srcLang: USE_EQUAL_SETTER | HAS_LOWER_CASE,
	  start: USE_EQUAL_SETTER | HAS_NUMBER_VALUE,
	  step: USE_EQUAL_SETTER,
	  summary: USE_EQUAL_SETTER,
	  tabIndex: USE_EQUAL_SETTER | HAS_LOWER_CASE,
	  target: USE_EQUAL_SETTER,
	  textContent: USE_EQUAL_SETTER,
	  title: USE_EQUAL_SETTER,
	  type: USE_EQUAL_SETTER,
	  useMap: USE_EQUAL_SETTER | HAS_LOWER_CASE,
	  value: USE_EQUAL_SETTER,
	  width: USE_EQUAL_SETTER,
	  wrap: USE_EQUAL_SETTER,

	  allowFullScreen: USE_SET_ATTRIBUTE | HAS_LOWER_CASE | HAS_BOOLEAN_VALUE,
	  allowTransparency: USE_SET_ATTRIBUTE | HAS_LOWER_CASE,
	  capture: USE_SET_ATTRIBUTE | HAS_BOOLEAN_VALUE,
	  charset: USE_SET_ATTRIBUTE,
	  challenge: USE_SET_ATTRIBUTE,
	  codeBase: USE_SET_ATTRIBUTE | HAS_LOWER_CASE,
	  cols: USE_SET_ATTRIBUTE | HAS_NUMBER_VALUE,
	  contextMenu: USE_SET_ATTRIBUTE | HAS_LOWER_CASE,
	  dateTime: USE_SET_ATTRIBUTE | HAS_LOWER_CASE,
	  form: USE_SET_ATTRIBUTE,
	  formAction: USE_SET_ATTRIBUTE | HAS_LOWER_CASE,
	  formEncType: USE_SET_ATTRIBUTE | HAS_LOWER_CASE,
	  formMethod: USE_SET_ATTRIBUTE | HAS_LOWER_CASE,
	  formTarget: USE_SET_ATTRIBUTE | HAS_LOWER_CASE,
	  frameBorder: USE_SET_ATTRIBUTE | HAS_LOWER_CASE,
	  hidden: USE_SET_ATTRIBUTE | HAS_BOOLEAN_VALUE,
	  inputMode: USE_SET_ATTRIBUTE | HAS_LOWER_CASE,
	  is: USE_SET_ATTRIBUTE,
	  list: USE_SET_ATTRIBUTE,
	  manifest: USE_SET_ATTRIBUTE,
	  maxLength: USE_SET_ATTRIBUTE | HAS_LOWER_CASE,
	  media: USE_SET_ATTRIBUTE,
	  minLength: USE_SET_ATTRIBUTE | HAS_LOWER_CASE,
	  rows: USE_SET_ATTRIBUTE | HAS_NUMBER_VALUE,
	  size: USE_SET_ATTRIBUTE | HAS_NUMBER_VALUE,
	  sizes: USE_SET_ATTRIBUTE,
	  srcSet: USE_SET_ATTRIBUTE | HAS_LOWER_CASE,
	  style: USE_SET_ATTRIBUTE,

	  aria: IS_STAR,
	  data: IS_STAR
	};

	_eventsList.eventsList.forEach(function (event) {
	  props['on' + event] = USE_EVENT_LISTENER | HAS_EVENT_CASE;
	});

	var descriptors /*: Object*/ = {};
	var keys /*: Array<string>*/ = Object.keys(props);
	var len /*: number*/ = keys.length;
	var i /*: number*/ = -1;

	while (++i < len) {
	  var key /*: string*/ = keys[i];
	  var prop /*: number*/ = props[key];
	  var hasLowerCase /*: boolean*/ = checkMask(prop, HAS_LOWER_CASE);
	  var hasDashedCase /*: boolean*/ = checkMask(prop, HAS_DASHED_CASE);
	  var hasEventCase /*: boolean*/ = checkMask(prop, HAS_EVENT_CASE);
	  var useEqualSetter /*: boolean*/ = checkMask(prop, USE_EQUAL_SETTER);
	  var useSetAttribute /*: boolean*/ = checkMask(prop, USE_SET_ATTRIBUTE);
	  var useEventListener /*: boolean*/ = checkMask(prop, USE_EVENT_LISTENER);
	  var hasBooleanValue /*: boolean*/ = checkMask(prop, HAS_BOOLEAN_VALUE);
	  var hasNumberValue /*: boolean*/ = checkMask(prop, HAS_NUMBER_VALUE);
	  var isStar /*: boolean*/ = checkMask(prop, IS_STAR);
	  var computed /*: string*/ = computeName(key, hasLowerCase, hasDashedCase, hasEventCase);

	  descriptors[key] = {
	    useEqualSetter: useEqualSetter,
	    useSetAttribute: useSetAttribute,
	    useEventListener: useEventListener,
	    hasBooleanValue: hasBooleanValue,
	    hasNumberValue: hasNumberValue,
	    isStar: isStar,
	    computed: computed
	  };
	}

	exports.descriptors = descriptors;

/***/ },
/* 63 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/* @flow */

	var eventsList /*: Array<string>*/ = exports.eventsList = ["Abort", "Blur", "Cancel", "CanPlay", "CanPlayThrough", "Change", "Click", "CompositionStart", "CompositionUpdate", "CompositionEnd", "ContextMenu", "Copy", "CueChange", "Cut", "DblClick", "Drag", "DragEnd", "DragExit", "DragEnter", "DragLeave", "DragOver", "DragStart", "Drop", "DurationChange", "Emptied", "Encrypted", "Ended", "Error", "Focus", "FocusIn", "FocusOut", "Input", "Invalid", "KeyDown", "KeyPress", "KeyUp", "Load", "LoadedData", "LoadedMetaData", "LoadStart", "MouseDown", "MouseEnter", "MouseLeave", "MouseMove", "MouseOut", "MouseOver", "MouseUp", "Paste", "Pause", "Play", "Playing", "Progress", "RateChange", "Reset", "Resize", "Scroll", "Search", "Seeked", "Seeking", "Select", "Show", "Stalled", "Submit", "Suspend", "TimeUpdate", "Toggle", "TouchCancel", "TouchEnd", "TouchMove", "TouchStart", "VolumeChange", "Waiting", "Wheel",

	// custom
	"Mount", "Unmount"];

	var eventListMap /*: Object*/ = exports.eventListMap = eventsList.reduce(function (acc, event) {
	  acc["on" + event] = true;
	  return acc;
	}, {});

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.removeEventListener = exports.addEventListener = undefined;

	var _domDelegator = __webpack_require__(65);

	var _domDelegator2 = _interopRequireDefault(_domDelegator);

	var _domDelegator3 = __webpack_require__(67);

	var _domDelegator4 = _interopRequireDefault(_domDelegator3);

	var _eventsList = __webpack_require__(63);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var delegator /*: DomDelegator*/ = (0, _domDelegator2.default)(); /* @flow */

	var len /*: number*/ = _eventsList.eventsList.length;
	var i /*: number*/ = -1;

	while (++i < len) {
	  var event /*: string*/ = _eventsList.eventsList[i].toLowerCase();
	  delegator.listenTo(event);
	}

	var addEventListener = exports.addEventListener = delegator.addEventListener.bind(delegator);
	var removeEventListener = exports.removeEventListener = delegator.removeEventListener.bind(delegator);

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	var Individual = __webpack_require__(66)
	var cuid = __webpack_require__(3)
	var globalDocument = __webpack_require__(60)

	var DOMDelegator = __webpack_require__(67)

	var versionKey = "13"
	var cacheKey = "__DOM_DELEGATOR_CACHE@" + versionKey
	var cacheTokenKey = "__DOM_DELEGATOR_CACHE_TOKEN@" + versionKey
	var delegatorCache = Individual(cacheKey, {
	    delegators: {}
	})
	var commonEvents = [
	    "blur", "change", "click",  "contextmenu", "dblclick",
	    "error","focus", "focusin", "focusout", "input", "keydown",
	    "keypress", "keyup", "load", "mousedown", "mouseup",
	    "resize", "select", "submit", "touchcancel",
	    "touchend", "touchstart", "unload"
	]

	/*  Delegator is a thin wrapper around a singleton `DOMDelegator`
	        instance.

	    Only one DOMDelegator should exist because we do not want
	        duplicate event listeners bound to the DOM.

	    `Delegator` will also `listenTo()` all events unless
	        every caller opts out of it
	*/
	module.exports = Delegator

	function Delegator(opts) {
	    opts = opts || {}
	    var document = opts.document || globalDocument

	    var cacheKey = document[cacheTokenKey]

	    if (!cacheKey) {
	        cacheKey =
	            document[cacheTokenKey] = cuid()
	    }

	    var delegator = delegatorCache.delegators[cacheKey]

	    if (!delegator) {
	        delegator = delegatorCache.delegators[cacheKey] =
	            new DOMDelegator(document)
	    }

	    if (opts.defaultEvents !== false) {
	        for (var i = 0; i < commonEvents.length; i++) {
	            delegator.listenTo(commonEvents[i])
	        }
	    }

	    return delegator
	}

	Delegator.allocateHandle = DOMDelegator.allocateHandle;
	Delegator.transformHandle = DOMDelegator.transformHandle;


/***/ },
/* 66 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {var root = typeof window !== 'undefined' ?
	    window : typeof global !== 'undefined' ?
	    global : {};

	module.exports = Individual

	function Individual(key, value) {
	    if (root[key]) {
	        return root[key]
	    }

	    Object.defineProperty(root, key, {
	        value: value
	        , configurable: true
	    })

	    return value
	}

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	var globalDocument = __webpack_require__(60)
	var EvStore = __webpack_require__(68)
	var createStore = __webpack_require__(71)

	var addEvent = __webpack_require__(73)
	var removeEvent = __webpack_require__(74)
	var ProxyEvent = __webpack_require__(75)

	var HANDLER_STORE = createStore()

	module.exports = DOMDelegator

	function DOMDelegator(document) {
	    if (!(this instanceof DOMDelegator)) {
	        return new DOMDelegator(document);
	    }

	    document = document || globalDocument

	    this.target = document.documentElement
	    this.events = {}
	    this.rawEventListeners = {}
	    this.globalListeners = {}
	}

	DOMDelegator.prototype.addEventListener = addEvent
	DOMDelegator.prototype.removeEventListener = removeEvent

	DOMDelegator.allocateHandle =
	    function allocateHandle(func) {
	        var handle = new Handle()

	        HANDLER_STORE(handle).func = func;

	        return handle
	    }

	DOMDelegator.transformHandle =
	    function transformHandle(handle, broadcast) {
	        var func = HANDLER_STORE(handle).func

	        return this.allocateHandle(function (ev) {
	            broadcast(ev, func);
	        })
	    }

	DOMDelegator.prototype.addGlobalEventListener =
	    function addGlobalEventListener(eventName, fn) {
	        var listeners = this.globalListeners[eventName] || [];
	        if (listeners.indexOf(fn) === -1) {
	            listeners.push(fn)
	        }

	        this.globalListeners[eventName] = listeners;
	    }

	DOMDelegator.prototype.removeGlobalEventListener =
	    function removeGlobalEventListener(eventName, fn) {
	        var listeners = this.globalListeners[eventName] || [];

	        var index = listeners.indexOf(fn)
	        if (index !== -1) {
	            listeners.splice(index, 1)
	        }
	    }

	DOMDelegator.prototype.listenTo = function listenTo(eventName) {
	    if (!(eventName in this.events)) {
	        this.events[eventName] = 0;
	    }

	    this.events[eventName]++;

	    if (this.events[eventName] !== 1) {
	        return
	    }

	    var listener = this.rawEventListeners[eventName]
	    if (!listener) {
	        listener = this.rawEventListeners[eventName] =
	            createHandler(eventName, this)
	    }

	    this.target.addEventListener(eventName, listener, true)
	}

	DOMDelegator.prototype.unlistenTo = function unlistenTo(eventName) {
	    if (!(eventName in this.events)) {
	        this.events[eventName] = 0;
	    }

	    if (this.events[eventName] === 0) {
	        throw new Error("already unlistened to event.");
	    }

	    this.events[eventName]--;

	    if (this.events[eventName] !== 0) {
	        return
	    }

	    var listener = this.rawEventListeners[eventName]

	    if (!listener) {
	        throw new Error("dom-delegator#unlistenTo: cannot " +
	            "unlisten to " + eventName)
	    }

	    this.target.removeEventListener(eventName, listener, true)
	}

	function createHandler(eventName, delegator) {
	    var globalListeners = delegator.globalListeners;
	    var delegatorTarget = delegator.target;

	    return handler

	    function handler(ev) {
	        var globalHandlers = globalListeners[eventName] || []

	        if (globalHandlers.length > 0) {
	            var globalEvent = new ProxyEvent(ev);
	            globalEvent.currentTarget = delegatorTarget;
	            callListeners(globalHandlers, globalEvent)
	        }

	        findAndInvokeListeners(ev.target, ev, eventName)
	    }
	}

	function findAndInvokeListeners(elem, ev, eventName) {
	    var listener = getListener(elem, eventName)

	    if (listener && listener.handlers.length > 0) {
	        var listenerEvent = new ProxyEvent(ev);
	        listenerEvent.currentTarget = listener.currentTarget
	        callListeners(listener.handlers, listenerEvent)

	        if (listenerEvent._bubbles) {
	            var nextTarget = listener.currentTarget.parentNode
	            findAndInvokeListeners(nextTarget, ev, eventName)
	        }
	    }
	}

	function getListener(target, type) {
	    // terminate recursion if parent is `null`
	    if (target === null || typeof target === "undefined") {
	        return null
	    }

	    var events = EvStore(target)
	    // fetch list of handler fns for this event
	    var handler = events[type]
	    var allHandler = events.event

	    if (!handler && !allHandler) {
	        return getListener(target.parentNode, type)
	    }

	    var handlers = [].concat(handler || [], allHandler || [])
	    return new Listener(target, handlers)
	}

	function callListeners(handlers, ev) {
	    handlers.forEach(function (handler) {
	        if (typeof handler === "function") {
	            handler(ev)
	        } else if (typeof handler.handleEvent === "function") {
	            handler.handleEvent(ev)
	        } else if (handler.type === "dom-delegator-handle") {
	            HANDLER_STORE(handler).func(ev)
	        } else {
	            throw new Error("dom-delegator: unknown handler " +
	                "found: " + JSON.stringify(handlers));
	        }
	    })
	}

	function Listener(target, handlers) {
	    this.currentTarget = target
	    this.handlers = handlers
	}

	function Handle() {
	    this.type = "dom-delegator-handle"
	}


/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var OneVersionConstraint = __webpack_require__(69);

	var MY_VERSION = '7';
	OneVersionConstraint('ev-store', MY_VERSION);

	var hashKey = '__EV_STORE_KEY@' + MY_VERSION;

	module.exports = EvStore;

	function EvStore(elem) {
	    var hash = elem[hashKey];

	    if (!hash) {
	        hash = elem[hashKey] = {};
	    }

	    return hash;
	}


/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Individual = __webpack_require__(70);

	module.exports = OneVersion;

	function OneVersion(moduleName, version, defaultValue) {
	    var key = '__INDIVIDUAL_ONE_VERSION_' + moduleName;
	    var enforceKey = key + '_ENFORCE_SINGLETON';

	    var versionValue = Individual(enforceKey, version);

	    if (versionValue !== version) {
	        throw new Error('Can only have one copy of ' +
	            moduleName + '.\n' +
	            'You already have version ' + versionValue +
	            ' installed.\n' +
	            'This means you cannot install version ' + version);
	    }

	    return Individual(key, defaultValue);
	}


/***/ },
/* 70 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';

	/*global window, global*/

	var root = typeof window !== 'undefined' ?
	    window : typeof global !== 'undefined' ?
	    global : {};

	module.exports = Individual;

	function Individual(key, value) {
	    if (key in root) {
	        return root[key];
	    }

	    root[key] = value;

	    return value;
	}

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	var hiddenStore = __webpack_require__(72);

	module.exports = createStore;

	function createStore() {
	    var key = {};

	    return function (obj) {
	        if ((typeof obj !== 'object' || obj === null) &&
	            typeof obj !== 'function'
	        ) {
	            throw new Error('Weakmap-shim: Key must be object')
	        }

	        var store = obj.valueOf(key);
	        return store && store.identity === key ?
	            store : hiddenStore(obj, key);
	    };
	}


/***/ },
/* 72 */
/***/ function(module, exports) {

	module.exports = hiddenStore;

	function hiddenStore(obj, key) {
	    var store = { identity: key };
	    var valueOf = obj.valueOf;

	    Object.defineProperty(obj, "valueOf", {
	        value: function (value) {
	            return value !== key ?
	                valueOf.apply(this, arguments) : store;
	        },
	        writable: true
	    });

	    return store;
	}


/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	var EvStore = __webpack_require__(68)

	module.exports = addEvent

	function addEvent(target, type, handler) {
	    var events = EvStore(target)
	    var event = events[type]

	    if (!event) {
	        events[type] = handler
	    } else if (Array.isArray(event)) {
	        if (event.indexOf(handler) === -1) {
	            event.push(handler)
	        }
	    } else if (event !== handler) {
	        events[type] = [event, handler]
	    }
	}


/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	var EvStore = __webpack_require__(68)

	module.exports = removeEvent

	function removeEvent(target, type, handler) {
	    var events = EvStore(target)
	    var event = events[type]

	    if (!event) {
	        return
	    } else if (Array.isArray(event)) {
	        var index = event.indexOf(handler)
	        if (index !== -1) {
	            event.splice(index, 1)
	        }
	    } else if (event === handler) {
	        events[type] = null
	    }
	}


/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	var inherits = __webpack_require__(76)

	var ALL_PROPS = [
	    "altKey", "bubbles", "cancelable", "ctrlKey",
	    "eventPhase", "metaKey", "relatedTarget", "shiftKey",
	    "target", "timeStamp", "type", "view", "which"
	]
	var KEY_PROPS = ["char", "charCode", "key", "keyCode"]
	var MOUSE_PROPS = [
	    "button", "buttons", "clientX", "clientY", "layerX",
	    "layerY", "offsetX", "offsetY", "pageX", "pageY",
	    "screenX", "screenY", "toElement"
	]

	var rkeyEvent = /^key|input/
	var rmouseEvent = /^(?:mouse|pointer|contextmenu)|click/

	module.exports = ProxyEvent

	function ProxyEvent(ev) {
	    if (!(this instanceof ProxyEvent)) {
	        return new ProxyEvent(ev)
	    }

	    if (rkeyEvent.test(ev.type)) {
	        return new KeyEvent(ev)
	    } else if (rmouseEvent.test(ev.type)) {
	        return new MouseEvent(ev)
	    }

	    for (var i = 0; i < ALL_PROPS.length; i++) {
	        var propKey = ALL_PROPS[i]
	        this[propKey] = ev[propKey]
	    }

	    this._rawEvent = ev
	    this._bubbles = false;
	}

	ProxyEvent.prototype.preventDefault = function () {
	    this._rawEvent.preventDefault()
	}

	ProxyEvent.prototype.startPropagation = function () {
	    this._bubbles = true;
	}

	function MouseEvent(ev) {
	    for (var i = 0; i < ALL_PROPS.length; i++) {
	        var propKey = ALL_PROPS[i]
	        this[propKey] = ev[propKey]
	    }

	    for (var j = 0; j < MOUSE_PROPS.length; j++) {
	        var mousePropKey = MOUSE_PROPS[j]
	        this[mousePropKey] = ev[mousePropKey]
	    }

	    this._rawEvent = ev
	}

	inherits(MouseEvent, ProxyEvent)

	function KeyEvent(ev) {
	    for (var i = 0; i < ALL_PROPS.length; i++) {
	        var propKey = ALL_PROPS[i]
	        this[propKey] = ev[propKey]
	    }

	    for (var j = 0; j < KEY_PROPS.length; j++) {
	        var keyPropKey = KEY_PROPS[j]
	        this[keyPropKey] = ev[keyPropKey]
	    }

	    this._rawEvent = ev
	}

	inherits(KeyEvent, ProxyEvent)


/***/ },
/* 76 */
/***/ function(module, exports) {

	if (typeof Object.create === 'function') {
	  // implementation from standard node.js 'util' module
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    ctor.prototype = Object.create(superCtor.prototype, {
	      constructor: {
	        value: ctor,
	        enumerable: false,
	        writable: true,
	        configurable: true
	      }
	    });
	  };
	} else {
	  // old school shim for old browsers
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    var TempCtor = function () {}
	    TempCtor.prototype = superCtor.prototype
	    ctor.prototype = new TempCtor()
	    ctor.prototype.constructor = ctor
	  }
	}


/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.emitMount = emitMount;
	exports.emitUnmount = emitUnmount;

	var _CustomEvent = __webpack_require__(78);

	var _is = __webpack_require__(6);

	/* @flow */

	/*:: type MountableElement = {
	  parentNode: Node;
	  dispatchEvent (event: CustomEvent): boolean;
	}*/
	function emitMount(node /*: MountableElement*/, fn /*: Function | void*/) /*: void*/ {
	  if (((0, _is.isFunction)(fn) || (0, _is.isSubject)(fn)) && node.parentNode) {
	    var _event /*: CustomEvent*/ = new _CustomEvent.CustomEvent('mount');
	    node.dispatchEvent(_event);
	  }
	}

	function emitUnmount(node /*: MountableElement*/, fn /*: Function | void*/) /*: void*/ {
	  if (((0, _is.isFunction)(fn) || (0, _is.isSubject)(fn)) && node.parentNode) {
	    var _event2 /*: CustomEvent*/ = new _CustomEvent.CustomEvent('unmount');
	    node.dispatchEvent(_event2);
	  }
	}

/***/ },
/* 78 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var CustomEvent = exports.CustomEvent = global.CustomEvent || function () {
	  var DEFAULT_PARAMS = { bubbles: false, cancelable: false, detail: undefined };

	  function _CustomEvent(_event, _params) {
	    var params = _extends({}, DEFAULT_PARAMS, _params);
	    var event = document.createEvent("CustomEvent");

	    event.initCustomEvent(_event, params.bubbles, params.cancelable, params.detail);
	    return event;
	  }

	  return _CustomEvent;
	}();
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 79 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.get = get;
	function get(obj, key) {
	  return obj[key];
	}

/***/ },
/* 80 */
/***/ function(module, exports) {

	'use strict';

	/*:: import type {VirtualElement} from './VirtualElement'*/
	/*:: import type {VirtualComponent} from './VirtualComponent'*/
	/*:: import type {VirtualText} from './VirtualText'*/
	/*:: import type {ElementProxy} from './ElementProxy'*/
	/*:: import type {TextProxy} from './TextProxy'*/
	/*:: export type VirtualNode = VirtualElement | VirtualComponent | VirtualText*/
	/*:: export type NodeProxy = ElementProxy | TextProxy*/
	/*:: export type ElementProxyDecorator = {
	  insertChild (child: VirtualNode, index: number): void;
	  updateChild (previous: VirtualNode, next: VirtualNode): void;
	  moveChild (previous: VirtualNode, next: VirtualNode, index: number): void;
	  removeChild (child: VirtualNode): void;
	}*/

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.wrapText = wrapText;

	var _VirtualText = __webpack_require__(82);

	var _is = __webpack_require__(6);

	/* @flow */

	/*:: import type {VirtualElement} from './types'*/


	function wrap(obj /*: any*/) /*: VirtualElement*/ {
	  if ((0, _is.isVirtual)(obj)) {
	    return obj;
	  }

	  return _VirtualText.VirtualText.create(obj.toString());
	}

	function wrapText(arr /*: Array<any>*/) /*: Array<VirtualElement>*/ {
	  return arr.map(wrap);
	}

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.VirtualText = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* @flow */

	var _TextProxy = __webpack_require__(83);

	var _symbol = __webpack_require__(7);

	var _set = __webpack_require__(57);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var VirtualText = exports.VirtualText = function () {
	  function VirtualText(content /*: string*/) {
	    _classCallCheck(this, VirtualText);

	    this._content = content;
	  }

	  _createClass(VirtualText, [{
	    key: 'getProxy',
	    value: function getProxy() {
	      return this._proxy;
	    }
	  }, {
	    key: 'initialize',
	    value: function initialize() {
	      this._proxy = _TextProxy.TextProxy.createTextNode(this._content);
	    }
	  }, {
	    key: 'patch',
	    value: function patch(next /*: VirtualText*/) {
	      var proxy /*: TextProxy*/ = next._proxy = this._proxy;
	      proxy.setValue(next._content);
	    }
	  }, {
	    key: 'afterInsert',
	    value: function afterInsert() {}
	  }, {
	    key: 'beforeDestroy',
	    value: function beforeDestroy() {}
	  }, {
	    key: 'destroy',
	    value: function destroy() {}
	  }], [{
	    key: 'create',
	    value: function create(content) {
	      return new VirtualText(content);
	    }
	  }]);

	  return VirtualText;
	}();

	(0, _set.set)(VirtualText.prototype, 'key', null);
	(0, _set.set)(VirtualText.prototype, 'tagName', '__VIRTUAL_TEXT_NODE__');
	(0, _set.set)(VirtualText.prototype, _symbol.$$virtual, true);

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.TextProxy = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* @flow */

	var _document = __webpack_require__(60);

	var _document2 = _interopRequireDefault(_document);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var TextProxy = exports.TextProxy = function () {
	  function TextProxy(node /*: Text*/) {
	    _classCallCheck(this, TextProxy);

	    this._node = node;
	  }

	  _createClass(TextProxy, [{
	    key: 'setValue',
	    value: function setValue(value /*: string*/) {
	      this._node.nodeValue = value;
	    }
	  }], [{
	    key: 'createTextNode',
	    value: function createTextNode(content /*: string*/) {
	      var node /*: Text*/ = _document2.default.createTextNode(content);
	      return new TextProxy(node);
	    }
	  }]);

	  return TextProxy;
	}();

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.parseTag = parseTag;

	var _parseTag = __webpack_require__(85);

	var _parseTag2 = _interopRequireDefault(_parseTag);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var TAG_IS_ONLY_LETTERS = /^[a-zA-Z]*$/;

	function parseTag(_tagName, props) {
	  var tagName = _tagName;

	  if (!TAG_IS_ONLY_LETTERS.test(tagName)) {
	    tagName = (0, _parseTag2.default)(_tagName, props).toLowerCase();
	  }

	  return tagName;
	}

/***/ },
/* 85 */
/***/ function(module, exports) {

	'use strict';

	var classIdSplit = /([\.#]?[a-zA-Z0-9\u007F-\uFFFF_:-]+)/;
	var notClassId = /^\.|#/;

	module.exports = parseTag;

	function parseTag(tag, props) {
	  if (!tag) {
	    return 'DIV';
	  }

	  var noId = !(props.hasOwnProperty('id'));

	  var tagParts = tag.split(classIdSplit);
	  var tagName = null;

	  if (notClassId.test(tagParts[1])) {
	    tagName = 'DIV';
	  }

	  var classes, part, type, i;

	  for (i = 0; i < tagParts.length; i++) {
	    part = tagParts[i];

	    if (!part) {
	      continue;
	    }

	    type = part.charAt(0);

	    if (!tagName) {
	      tagName = part;
	    } else if (type === '.') {
	      classes = classes || [];
	      classes.push(part.substring(1, part.length));
	    } else if (type === '#' && noId) {
	      props.id = part.substring(1, part.length);
	    }
	  }

	  if (classes) {
	    if (props.className) {
	      classes.push(props.className);
	    }

	    props.className = classes.join(' ');
	  }

	  return props.namespace ? tagName : tagName.toUpperCase();
	}


/***/ },
/* 86 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.batchInsertMessages = batchInsertMessages;
	/* @flow */

	/*:: import type {VirtualNode} from './types'*/
	/*:: type Scope = {
	  batchInProgress: boolean;
	  queue: Array<VirtualNode>;
	}*/


	var scope /*: Scope*/ = {
	  batchInProgress: false,
	  queue: []
	};

	function flushQueue(queue /*: Array<VirtualNode>*/) /*: void*/ {
	  while (queue.length > 0) {
	    var vnode = scope.queue.pop();
	    vnode.afterInsert();
	  }
	}

	function batchInsertMessages(callback /*: Function*/, a /*: any*/, b /*: any*/, c /*: any*/) /*: any*/ {
	  if (scope.batchInProgress) {
	    return callback(scope.queue, a, b, c);
	  }

	  scope.batchInProgress = true;

	  var result = callback(scope.queue, a, b, c);
	  flushQueue(scope.queue);

	  scope.batchInProgress = false;

	  return result;
	}

/***/ },
/* 87 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.createPatchProperties = createPatchProperties;
	/* @flow */

	/*:: import type {ElementProxy} from './ElementProxy'*/


	function patchProperties(elementProxy /*: ElementProxy*/, props /*: Object*/, oldProps /*: Object*/) /*: Object*/ {
	  for (var key in props) {
	    if (props[key] !== oldProps[key]) {
	      elementProxy.setAttribute(key, props[key]);
	    }
	  }

	  for (var _key in oldProps) {
	    if (!(_key in props)) {
	      elementProxy.removeAttribute(_key);
	    }
	  }

	  return props;
	}

	function createPatchProperties(elementProxy /*: ElementProxy*/) /*: Function*/ {
	  var previous /*: Object*/ = {};

	  return function (next /*: Object*/) /*: void*/ {
	    previous = patchProperties(elementProxy, next, previous);
	  };
	}

/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.createPatchChildren = undefined;

	var _dift = __webpack_require__(89);

	var _dift2 = _interopRequireDefault(_dift);

	var _keyIndex = __webpack_require__(91);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/* @flow */

	/*:: import type {VirtualNode, ElementProxyDecorator} from './types'*/


	var keyFn /*: Function*/ = function keyFn(a) {
	  return a.key;
	};

	var patch = function patch(decorator /*: ElementProxyDecorator*/, previousChildren /*: Array<VirtualNode>*/, nextChildren /*: Array<VirtualNode>*/) /*: void*/ {
	  var previousIndex = (0, _keyIndex.keyIndex)(previousChildren);
	  var nextIndex = (0, _keyIndex.keyIndex)(nextChildren);

	  function apply(type /*: number*/, previous /*: Object*/, next /*: Object*/, index /*: number*/) /*: void*/ {
	    switch (type) {
	      case _dift.CREATE:
	        decorator.insertChild(next.vnode, index);
	        break;
	      case _dift.UPDATE:
	        decorator.updateChild(previous.vnode, next.vnode, index);
	        break;
	      case _dift.MOVE:
	        decorator.moveChild(previous.vnode, next.vnode, index);
	        break;
	      case _dift.REMOVE:
	        decorator.removeChild(previous.vnode);
	        break;
	      default:
	        return;
	    }
	  }

	  (0, _dift2.default)(previousIndex, nextIndex, apply, keyFn);
	};

	var createPatchChildren = exports.createPatchChildren = function createPatchChildren(decorator /*: ElementProxyDecorator*/) /*: Function*/ {
	  var previous /*: Array<VirtualNode>*/ = [];

	  return function (next /*: Array<VirtualNode>*/) /*: Array<VirtualNode>*/ {
	    if (previous.length !== 0 || next.length !== 0) {
	      patch(decorator, previous, next);
	    }

	    previous = next;
	    return next;
	  };
	};

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.REMOVE = exports.MOVE = exports.UPDATE = exports.CREATE = undefined;

	var _bitVector = __webpack_require__(90);

	/**
	 * Actions
	 */

	var CREATE = 0; /**
	                 * Imports
	                 */

	var UPDATE = 1;
	var MOVE = 2;
	var REMOVE = 3;

	/**
	 * dift
	 */

	function dift(prev, next, effect, key) {
	  var pStartIdx = 0;
	  var nStartIdx = 0;
	  var pEndIdx = prev.length - 1;
	  var nEndIdx = next.length - 1;
	  var pStartItem = prev[pStartIdx];
	  var nStartItem = next[nStartIdx];

	  // List head is the same
	  while (pStartIdx <= pEndIdx && nStartIdx <= nEndIdx && equal(pStartItem, nStartItem)) {
	    effect(UPDATE, pStartItem, nStartItem, nStartIdx);
	    pStartItem = prev[++pStartIdx];
	    nStartItem = next[++nStartIdx];
	  }

	  // The above case is orders of magnitude more common than the others, so fast-path it
	  if (nStartIdx > nEndIdx && pStartIdx > pEndIdx) {
	    return;
	  }

	  var pEndItem = prev[pEndIdx];
	  var nEndItem = next[nEndIdx];
	  var movedFromFront = 0;

	  // Reversed
	  while (pStartIdx <= pEndIdx && nStartIdx <= nEndIdx && equal(pStartItem, nEndItem)) {
	    effect(MOVE, pStartItem, nEndItem, pEndIdx - movedFromFront + 1);
	    pStartItem = prev[++pStartIdx];
	    nEndItem = next[--nEndIdx];
	    ++movedFromFront;
	  }

	  // Reversed the other way (in case of e.g. reverse and append)
	  while (pEndIdx >= pStartIdx && nStartIdx <= nEndIdx && equal(nStartItem, pEndItem)) {
	    effect(MOVE, pEndItem, nStartItem, nStartIdx);
	    pEndItem = prev[--pEndIdx];
	    nStartItem = next[++nStartIdx];
	    --movedFromFront;
	  }

	  // List tail is the same
	  while (pEndIdx >= pStartIdx && nEndIdx >= nStartIdx && equal(pEndItem, nEndItem)) {
	    effect(UPDATE, pEndItem, nEndItem, nEndIdx);
	    pEndItem = prev[--pEndIdx];
	    nEndItem = next[--nEndIdx];
	  }

	  if (pStartIdx > pEndIdx) {
	    while (nStartIdx <= nEndIdx) {
	      effect(CREATE, null, nStartItem, nStartIdx);
	      nStartItem = next[++nStartIdx];
	    }

	    return;
	  }

	  if (nStartIdx > nEndIdx) {
	    while (pStartIdx <= pEndIdx) {
	      effect(REMOVE, pStartItem);
	      pStartItem = prev[++pStartIdx];
	    }

	    return;
	  }

	  var created = 0;
	  var pivotDest = null;
	  var pivotIdx = pStartIdx - movedFromFront;
	  var keepBase = pStartIdx;
	  var keep = (0, _bitVector.createBv)(pEndIdx - pStartIdx);

	  var prevMap = keyMap(prev, pStartIdx, pEndIdx + 1, key);

	  for (; nStartIdx <= nEndIdx; nStartItem = next[++nStartIdx]) {
	    var oldIdx = prevMap[key(nStartItem)];

	    if (isUndefined(oldIdx)) {
	      effect(CREATE, null, nStartItem, pivotIdx++);
	      ++created;
	    } else if (pStartIdx !== oldIdx) {
	      (0, _bitVector.setBit)(keep, oldIdx - keepBase);
	      effect(MOVE, prev[oldIdx], nStartItem, pivotIdx++);
	    } else {
	      pivotDest = nStartIdx;
	    }
	  }

	  if (pivotDest !== null) {
	    (0, _bitVector.setBit)(keep, 0);
	    effect(MOVE, prev[pStartIdx], next[pivotDest], pivotDest);
	  }

	  // If there are no creations, then you have to
	  // remove exactly max(prevLen - nextLen, 0) elements in this
	  // diff. You have to remove one more for each element
	  // that was created. This means once we have
	  // removed that many, we can stop.
	  var necessaryRemovals = prev.length - next.length + created;
	  for (var removals = 0; removals < necessaryRemovals; pStartItem = prev[++pStartIdx]) {
	    if (!(0, _bitVector.getBit)(keep, pStartIdx - keepBase)) {
	      effect(REMOVE, pStartItem);
	      ++removals;
	    }
	  }

	  function equal(a, b) {
	    return key(a) === key(b);
	  }
	}

	function isUndefined(val) {
	  return typeof val === 'undefined';
	}

	function keyMap(items, start, end, key) {
	  var map = {};

	  for (var i = start; i < end; ++i) {
	    map[key(items[i])] = i;
	  }

	  return map;
	}

	/**
	 * Exports
	 */

	exports.default = dift;
	exports.CREATE = CREATE;
	exports.UPDATE = UPDATE;
	exports.MOVE = MOVE;
	exports.REMOVE = REMOVE;

/***/ },
/* 90 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * Use typed arrays if we can
	 */

	var FastArray = typeof Uint32Array === 'undefined' ? Array : Uint32Array;

	/**
	 * Bit vector
	 */

	function createBv(sizeInBits) {
	  return new FastArray(Math.ceil(sizeInBits / 32));
	}

	function setBit(v, idx) {
	  var r = idx % 32;
	  var pos = (idx - r) / 32;

	  v[pos] |= 1 << r;
	}

	function clearBit(v, idx) {
	  var r = idx % 32;
	  var pos = (idx - r) / 32;

	  v[pos] &= ~(1 << r);
	}

	function getBit(v, idx) {
	  var r = idx % 32;
	  var pos = (idx - r) / 32;

	  return !!(v[pos] & 1 << r);
	}

	/**
	 * Exports
	 */

	exports.createBv = createBv;
	exports.setBit = setBit;
	exports.clearBit = clearBit;
	exports.getBit = getBit;

/***/ },
/* 91 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.keyIndex = keyIndex;
	/* @flow */

	/*:: import type {VirtualNode} from './types'*/
	function keyIndex(children /*: Array<VirtualNode>*/) /*: Array<Object>*/ {
	  var len /*: number*/ = children.length;
	  var arr /*: Array<Object>*/ = [];
	  var i /*: number*/ = -1;

	  while (++i < len) {
	    var child /*: VirtualNode*/ = children[i];

	    if (!child) {
	      continue;
	    }

	    arr.push({
	      key: child.key ? child.tagName + '-' + child.key : child.tagName,
	      vnode: child
	    });
	  }

	  return arr;
	}

/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.createNodeProps = createNodeProps;

	var _Observable = __webpack_require__(5);

	var _eventsList = __webpack_require__(63);

	var _asObservable = __webpack_require__(48);

	var _is = __webpack_require__(6);

	__webpack_require__(49);

	__webpack_require__(55);

	/* @flow */

	var wrapValue = function wrapValue(key, value) {
	  if (_eventsList.eventListMap[key] && (0, _is.isSubject)(value)) {
	    return (0, _asObservable.asObservable)(value.next.bind(value));
	  }

	  return (0, _asObservable.asObservable)(value);
	};

	function createNodeProps(obj /*: Object*/) /*: Observable<Object>*/ {
	  if ((0, _is.isEmptyObject)(obj)) {
	    return _Observable.Observable.of(obj);
	  }

	  var keys /*: Array<string>*/ = Object.keys(obj);
	  var len /*: number*/ = keys.length;
	  var values /*: Array<Observable>*/ = Array(len);
	  var i /*: number*/ = -1;

	  while (++i < len) {
	    var key /*: string*/ = keys[i];
	    var value /*: any*/ = obj[key];
	    values[i] = wrapValue(key, value);
	  }

	  return _Observable.Observable.combineLatest(values, function () {
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    var newObj /*: Object*/ = {};
	    i = -1;

	    while (++i < len) {
	      var _key2 /*: string*/ = keys[i];
	      newObj[_key2] = args[i];
	    }

	    return newObj;
	  });
	}

/***/ },
/* 93 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.flatten = flatten;
	/* @flow */

	function flatten(arr /*: Array<any>*/) /*: Array<any>*/ {
	  var len /*: number*/ = arr.length;
	  var i /*: number*/ = -1;
	  var result /*: Array<any>*/ = [];

	  while (++i < len) {
	    var member /*: any*/ = arr[i];

	    if (Array.isArray(member)) {
	      result = result.concat(flatten(member));
	    } else {
	      result.push(member);
	    }
	  }

	  return result;
	}

/***/ },
/* 94 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/* @flow */

	var emptyObject = exports.emptyObject = Object.freeze({});

/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.render = render;

	var _batchInsertMessages = __webpack_require__(86);

	var _ElementProxy = __webpack_require__(59);

	var _VirtualElement = __webpack_require__(58);

	var _is = __webpack_require__(6);

	var _symbol = __webpack_require__(7);

	var _get = __webpack_require__(79);

	var _set = __webpack_require__(57);

	function render(vnode /*: VirtualElement*/, node /*: HTMLElement*/) /*: void*/ {
	  var containerProxy /*: ElementProxy*/ = _ElementProxy.ElementProxy.fromElement(node);
	  var previous /*: VirtualElement*/ = (0, _get.get)(node, _symbol.$$root);

	  if ((0, _is.isDefined)(previous)) {
	    if (previous.tagName === vnode.tagName) {
	      previous.patch(vnode);
	    } else {
	      previous.destroy();
	    }
	  }

	  (0, _batchInsertMessages.batchInsertMessages)(function (queue) {
	    vnode.initialize();
	    containerProxy.replaceChild(vnode.getProxy(), 0);
	    queue.push(vnode);
	  });

	  (0, _set.set)(node, _symbol.$$root, vnode);
	} /* @flow */

/***/ }
/******/ ])
});
;