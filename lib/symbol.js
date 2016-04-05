"use strict";

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