"use strict";

var createElement = require("./createElement");
var HTMLTags = require("./HTMLTags");

var boundCreateElement = function boundCreateElement(tagName) {
  return function (props) {
    for (var _len = arguments.length, children = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      children[_key - 1] = arguments[_key];
    }

    return createElement.apply(undefined, [tagName, props].concat(children));
  };
};

var helpers = {};
var length = HTMLTags.length;
var i = -1;

while (++i < length) {
  var tagName = HTMLTags[i];
  helpers[tagName] = boundCreateElement(tagName);
}

module.exports = helpers;