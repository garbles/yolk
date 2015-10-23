"use strict";

var domDelegator = require("dom-delegator");
var EventsList = require("./EventsList");

module.exports = function delegator(node) {
  var instance = domDelegator(node);

  var length = EventsList.length;
  var i = -1;

  while (++i < length) {
    instance.listenTo(EventsList[i].toLowerCase());
  }

  return instance;
};